# Andrii B. Portfolio Website

This folder contains the portfolio website and its local design system. The design source is the Figma file below, with the mobile `V02` frame width as the primary reference; page height should fit the content.

- Figma: https://www.figma.com/design/as1HwwRAJ9aksu6yWCLvFl/FigmaMCP?node-id=166-1382
- Reference node: `166:1382`
- Local design system: [design-system/README.md](design-system/README.md)
- Claude working rules: [CLAUDE.md](CLAUDE.md)

## Website Files

- `index.html` + `home/` - home portfolio page
- `about.html` + `about/` - about page
- `contact.html` + `contact/` - contact page
- `case-study.html` + `case-study.*` - project case study
- `nav/` - shared navigation overlay
- `design-system/` - tokens, shared component styles, fonts, icons, and image assets

## Spacing Rule

Maximum section padding is **48 px per side**. Never use 64 px as a section margin or padding — 48 px is the ceiling. The combined gap between two neighboring sections must never exceed 96 px. Internal gaps between related items (text, list rows, meta cells) follow the 4 px grid and are always smaller than the section edge padding.

Project case-study pages use proximity to make content groups clear: a chapter label stays close to its own content with a **16 px** internal gap, text chapter to text chapter uses a **48 px** gap, and image rows sit between text sections with **32 px** outside spacing. Inside image rows, gallery images use a **16 px** gap.

## Build Rule

All new website work should start from the local design system:

1. Load `design-system/colors_and_type.css`.
2. Reuse shared component patterns from `design-system/portfolio.css`.
3. Use local assets from `design-system/assets/`.
4. Follow the rules in `CLAUDE.md` before adding new visual styles.
