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

## Build Rule

All new website work should start from the local design system:

1. Load `design-system/colors_and_type.css`.
2. Reuse shared component patterns from `design-system/portfolio.css`.
3. Use local assets from `design-system/assets/`.
4. Follow the rules in `CLAUDE.md` before adding new visual styles.
