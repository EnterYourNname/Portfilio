from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
SOURCE_DIR = ROOT / "Project page text"
TEXT_OUTPUT = ROOT / "project_data.txt"
JSON_OUTPUT = ROOT / "project_data.json"

NAV_LINES = {
    "Home",
    "Work",
    "About Me",
    "CV",
    "Contact",
    "Contact Me",
    "Contact me",
    "Case study",
    "View case study",
}

FOOTER_MARKER = "# DESIGNING WITH PURPOSE, ALWAYS"


def repair_mojibake(text: str) -> str:
    """Fix common UTF-8 text that was accidentally decoded as Windows-1252."""
    if not any(marker in text for marker in ("\u00e2", "\u00f0", "\u00c2")):
        return text

    try:
        return text.encode("cp1252").decode("utf-8")
    except UnicodeError:
        return text


def slug_from_url(url: str) -> str:
    path = urlparse(url).path.strip("/")
    return path.split("/")[-1] if path else "home"


def title_from_slug(slug: str) -> str:
    special = {
        "vvs": "VVS",
        "cgi-for-smina": "CGI for Smina",
    }
    if slug in special:
        return special[slug]
    return " ".join(word.upper() if word in {"ui", "ux", "cgi"} else word.capitalize() for word in slug.split("-"))


def title_from_body(body: str, fallback: str, slug: str) -> str:
    match = re.search(r"^#\s+(.+)$", body, flags=re.MULTILINE)
    if match:
        title = match.group(1).strip()
    else:
        title = fallback

    title = re.sub(r"([A-Z]{2,})([a-z])", r"\1 \2", title)
    if title in {"Beer Box", "Unknown Project"} and slug not in {"beer-box", "home"}:
        return title_from_slug(slug)
    return title


def remove_metadata(content: str) -> tuple[dict[str, str], str]:
    metadata: dict[str, str] = {}

    for key in ("Title", "Description", "Source"):
        match = re.search(rf"^{key}:\s*(.+)$", content, flags=re.MULTILINE)
        metadata[key.lower()] = match.group(1).strip() if match else ""

    body = content.split("---", 1)[1] if "---" in content else content
    return metadata, body.strip()


def clean_body(body: str) -> str:
    body = body.split(FOOTER_MARKER, 1)[0]
    body = re.sub(r"\[[^\]]+\]\([^)]+\)", "", body)

    cleaned: list[str] = []
    seen_recent: list[str] = []

    for raw_line in body.splitlines():
        line = raw_line.strip()

        if not line:
            if cleaned and cleaned[-1] != "":
                cleaned.append("")
            continue

        if line in NAV_LINES:
            continue

        # Remove repeated labels from scraped auto-layout text, e.g. Timeline / Timeline.
        if cleaned and cleaned[-1] == line:
            continue

        # Remove unbulleted repeats of the last few bullet items.
        normalized = line.removeprefix("- ").strip()
        if normalized in seen_recent:
            continue

        cleaned.append(line)
        if line.startswith("- "):
            seen_recent.append(normalized)
            seen_recent = seen_recent[-12:]

    text = "\n".join(cleaned).strip()
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def extract_project(path: Path) -> dict[str, str]:
    content = repair_mojibake(path.read_text(encoding="utf-8"))
    metadata, body = remove_metadata(content)
    body = clean_body(body)
    source = metadata.get("source", "")
    slug = slug_from_url(source)
    page_title = title_from_body(body, metadata.get("title", "Unknown Project"), slug)

    return {
        "source_file": str(path.relative_to(ROOT)),
        "source_url": source,
        "slug": slug,
        "scraped_title": metadata.get("title", ""),
        "page_title": page_title,
        "body": body,
    }


def main() -> None:
    if not SOURCE_DIR.exists():
        raise FileNotFoundError(f"Missing source folder: {SOURCE_DIR}")

    files = sorted(SOURCE_DIR.glob("*/content.md"))
    projects = [extract_project(path) for path in files]

    # The homepage scrape is useful as reference, but it is not a project page.
    project_pages = [project for project in projects if project["slug"] != "home"]

    text_blocks: list[str] = []
    for project in project_pages:
        text_blocks.append("=========================================\n")
        text_blocks.append(f"PROJECT ID: {project['slug']}\n")
        text_blocks.append(f"PAGE TITLE: {project['page_title']}\n")
        text_blocks.append(f"SOURCE: {project['source_url']}\n")
        text_blocks.append("=========================================\n\n")
        text_blocks.append(project["body"])
        text_blocks.append("\n\n\n")

    TEXT_OUTPUT.write_text("".join(text_blocks), encoding="utf-8")
    JSON_OUTPUT.write_text(json.dumps(project_pages, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Found {len(files)} content files.")
    print(f"Exported {len(project_pages)} project pages.")
    print(f"Wrote {TEXT_OUTPUT.name} and {JSON_OUTPUT.name}.")


if __name__ == "__main__":
    main()
