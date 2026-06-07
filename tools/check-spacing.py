#!/usr/bin/env python3
"""
check-spacing.py — enforce the design-system 4px spacing grid.

The rule (design-system/README.md → Spacing): every SPACING value
(padding, margin, gap, and box offsets) must be a multiple of 4px.
This script flags any off-grid px value on those properties so the
rule is enforced at write time instead of relying on memory.

Usage:
  python tools/check-spacing.py <file.css> [<file.css> ...]   # lint specific files
  python tools/check-spacing.py --all                          # lint the whole project
  (no args, stdin = hook JSON)                                 # lint the edited file

Exit codes:
  0  clean (no violations)
  2  violations found (stderr lists them; PostToolUse feeds this back to Claude)
  1  usage / runtime error
"""
import sys
import os
import re
import glob
import json

# Properties governed by the 4px spacing rule — layout RHYTHM only
# (padding / margin / gap). Positioning offsets (top/right/bottom/left/inset)
# are deliberately NOT checked: they're routinely used for non-rhythm tricks
# (sr-only `left:-9999px`, `-1px` border overlaps, the .pk-link `-2px`
# underline nudge) that must stay off-grid. Keeping scope tight here keeps the
# linter credible — a noisy linter gets ignored.
SPACING_PROPS = {
    "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
    "margin-inline", "margin-block",
    "margin-inline-start", "margin-inline-end",
    "margin-block-start", "margin-block-end",
    "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
    "padding-inline", "padding-block",
    "padding-inline-start", "padding-inline-end",
    "padding-block-start", "padding-block-end",
    "gap", "row-gap", "column-gap", "grid-gap",
}

STEP = 4  # px grid step

# Sub-grid hairlines (1-3px) are allowed as optical nudges / borders, not
# rhythm. Anything >= 4px must land on the grid.
HAIRLINE_MAX = STEP  # exclusive: abs(value) < 4px is skipped

# Off-grid px values that are intentionally allowed (exact matches). Keep this
# list tiny and justify every entry. Empty by default — spacing has no real
# exceptions; add here only with a documented reason.
ALLOW_VALUES = set()  # e.g. {"1px"}

# Skip declarations whose value uses these functions — responsive / tokenised
# values are intentional, and var(--space-*) tokens are grid-compliant by design.
SKIP_FUNCS = ("calc(", "clamp(", "min(", "max(", "var(", "env(")

DECL_RE = re.compile(r"([\w-]+)\s*:\s*([^;{}]+);")
PX_RE = re.compile(r"(-?\d*\.?\d+)px")


def strip_comments(text):
    """Remove /* ... */ comments but keep newlines so line numbers stay correct."""
    def repl(m):
        return re.sub(r"[^\n]", " ", m.group(0))
    return re.sub(r"/\*.*?\*/", repl, text, flags=re.S)


def check_file(path):
    """Return a list of violation dicts for one CSS file.

    strip_comments() preserves length and newlines, so character offsets in the
    cleaned text map 1:1 onto the raw file — that lets --fix edit raw safely.
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()
    except (OSError, UnicodeDecodeError) as e:
        print(f"check-spacing: cannot read {path}: {e}", file=sys.stderr)
        return []

    clean = strip_comments(raw)
    # offset -> line number lookup
    line_starts = [0]
    for ch in clean:
        line_starts.append(line_starts[-1] + 1)
    violations = []

    for m in DECL_RE.finditer(clean):
        prop = m.group(1).strip().lower()
        value = m.group(2)
        if prop not in SPACING_PROPS:
            continue
        if any(fn in value for fn in SKIP_FUNCS):
            continue
        value_start = m.start(2)
        for px in PX_RE.finditer(value):
            token = px.group(0)  # e.g. "14px"
            if token in ALLOW_VALUES:
                continue
            num = float(px.group(1))
            if abs(num) < HAIRLINE_MAX:  # 0-3px: hairline / optical, allowed
                continue
            if abs(num) % STEP != 0:
                nearest_n = round(abs(num) / STEP) * STEP
                sign = "-" if num < 0 else ""
                abs_start = value_start + px.start(0)
                abs_end = value_start + px.end(0)
                violations.append({
                    "path": path,
                    "line": clean.count("\n", 0, abs_start) + 1,
                    "prop": prop,
                    "value": token,
                    "nearest": f"{sign}{nearest_n}px",
                    "start": abs_start,
                    "end": abs_end,
                })
    return violations


def fix_file(path, violations):
    """Apply rounded values to the exact flagged spans in the raw file."""
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()
    # apply from the end so earlier offsets stay valid
    for v in sorted(violations, key=lambda x: x["start"], reverse=True):
        raw = raw[: v["start"]] + v["nearest"] + raw[v["end"]:]
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(raw)
    return len(violations)


def default_targets():
    """All CSS in the project (design system + page styles)."""
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    targets = []
    for pat in ("design-system/*.css", "**/*.css"):
        targets += glob.glob(os.path.join(root, pat), recursive=True)
    # de-dupe, skip node_modules-ish folders
    seen, out = set(), []
    for p in targets:
        ap = os.path.abspath(p)
        if ap in seen or os.sep + "node_modules" + os.sep in ap:
            continue
        seen.add(ap)
        out.append(p)
    return out


def file_from_stdin():
    """When invoked as a PostToolUse hook, read the edited file path from JSON."""
    if sys.stdin is None or sys.stdin.isatty():
        return None
    data = sys.stdin.read().strip()
    if not data:
        return None
    try:
        payload = json.loads(data)
    except json.JSONDecodeError:
        return None
    fp = (payload.get("tool_input") or {}).get("file_path")
    if fp and fp.lower().endswith(".css"):
        return fp
    return None


def main(argv):
    do_fix = "--fix" in argv
    argv = [a for a in argv if a != "--fix"]

    if "--all" in argv:
        files = default_targets()
    elif len(argv) > 1:
        files = [a for a in argv[1:] if a.endswith(".css")]
    else:
        stdin_file = file_from_stdin()
        if stdin_file is None:
            # Not a CSS edit (or nothing piped) — nothing to do.
            return 0
        files = [stdin_file]

    if not files:
        return 0

    per_file = []
    for f in files:
        if os.path.exists(f):
            v = check_file(f)
            if v:
                per_file.append((f, v))

    all_v = [v for _, vs in per_file for v in vs]
    if not all_v:
        return 0

    if do_fix:
        total = 0
        for f, vs in per_file:
            total += fix_file(f, vs)
        print(f"[check-spacing] Fixed {total} off-grid value(s) across "
              f"{len(per_file)} file(s). Re-run without --fix to confirm.",
              file=sys.stderr)
        for v in all_v:
            print(f"  {v['path']}:{v['line']}  {v['prop']}: {v['value']} -> {v['nearest']}",
                  file=sys.stderr)
        return 0

    print("[check-spacing] Off-grid spacing -- must be a multiple of 4px "
          "(see design-system/README.md -> Spacing):", file=sys.stderr)
    for v in all_v:
        print(f"  {v['path']}:{v['line']}  {v['prop']}: {v['value']}  -> use {v['nearest']}",
              file=sys.stderr)
    print(f"  {len(all_v)} violation(s). Round to the nearest 4px step, "
          f"a --space-* token, or run with --fix.", file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv))
