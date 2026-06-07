# Andrii B. Portfolio Website

This folder contains the portfolio website and its local design system. The design source is the Figma file below, with the mobile `V02` frame width as the primary reference; page height should fit the content.

- Reference node: `166:1382`
- Local design system: [design-system/README.md](design-system/README.md)
- Claude working rules: [CLAUDE.md](CLAUDE.md)

## Website Files

- `index.html` + `home/` - home portfolio page (served as `/`)
- `about.html` + `about/` - about page (served as `/about`)
- `contact.html` + `contact/` - contact page (served as `/contact`)
- `case-study.html` + `case-study.*` - project case study (served as `/case-study?project={id}`)
- `impressum.html`, `privacy.html` - legal pages (served as `/impressum`, `/privacy`)
- `nav/` - shared navigation overlay
- `design-system/` - tokens, shared component styles, fonts, icons, and image assets

## Clean URLs

The site uses extensionless URLs everywhere — users never see `.html` in the address bar. GitHub Pages automatically serves `/about` from `about.html`, `/contact` from `contact.html`, and so on. Always write internal links as `/about`, `/contact`, `/privacy`, `/impressum`, `/case-study?project={id}` — never with the `.html` suffix.

The actual files on disk keep their `.html` extension so the project stays a flat static site; only the URLs are clean.

**Local preview:** the `contact` dev server (`.claude/launch.json`, port 5173) runs `npx serve`, which reads `serve.json` (`"cleanUrls": true` + a `/case-study` rewrite). So clean URLs work locally exactly like production — `http://localhost:5173/case-study?project=beer-box`, `/about`, `/contact` all resolve. (First start takes ~10s while `npx` resolves `serve`.)

Production (GitHub Pages) handles clean URLs automatically.

## Spacing Rule

Maximum section padding is **48 px per side**. Never use 64 px as a section margin or padding — 48 px is the ceiling. The combined gap between two neighboring sections must never exceed 96 px. Internal gaps between related items (text, list rows, meta cells) follow the 4 px grid and are always smaller than the section edge padding.

Project case-study pages use proximity to make content groups clear: a chapter label stays close to its own content with a **16 px** internal gap, text chapter to text chapter uses a **48 px** gap, and image rows sit between text sections with **32 px** outside spacing. Inside image rows, gallery images use a **16 px** gap.

## Responsive Rules

All main layout wrappers (e.g., `.phone`, `.hm-phone`, `.ct-phone`, `.am-phone`) must use a fluid width bounded by minimum and maximum constraints to ensure content gracefully fits all mobile device sizes without breaking or overflowing the grid:
- `width: 100%;`
- `max-width: 393px;` (Matches the primary Figma mobile reference)
- `min-width: 360px;` (Ensures safe display down to narrow mobile screens)

Never hardcode strict pixel widths (`width: 393px`) on these structural containers.

## Build Rule

All new website work should start from the local design system:

1. Load `design-system/colors_and_type.css`.
2. Reuse shared component patterns from `design-system/portfolio.css`.
3. Use local assets from `design-system/assets/`.
4. Follow the rules in `CLAUDE.md` before adding new visual styles.
