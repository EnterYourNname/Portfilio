# Claude Website Design System Rules

Use this file as the working contract for building and editing the website in this folder.

## Source Of Truth

- Primary frame: `166:1382` (`V02`, mobile 393 px wide; height must fit the live content)
- Local tokens: `design-system/colors_and_type.css`
- Shared UI patterns: `design-system/portfolio.css`
- Assets: `design-system/assets/`

If Figma and code differ, keep the code usable first, then align the visual details back toward Figma.

## Changing A Design Rule

A rule lives in up to four places that must stay in sync, or it drifts: **this file
(`CLAUDE.md`, the contract), `design-system/README.md` (the spec), the CSS code, and
`tools/check-spacing.py` (enforcement).** Whenever you add or change a rule, follow this
protocol in order — do not stop after editing only the code or only one doc:

1. **State the rule in one sentence** (its canonical wording).
2. **Change the CSS** to match.
3. **Update this file (`CLAUDE.md`)** — the section that states the rule.
4. **Update `design-system/README.md`** — the matching table/section.
5. **Update enforcement** if the rule is mechanically checkable — a constant, the
   `ALLOW_VALUES` list, or a new check in `tools/check-spacing.py`. If it is not
   checkable, leave it as a written rule.
6. **Record + verify:**
   - Append a dated entry to README → **"Recent System Updates"** (the change ledger).
   - Bump the `?v=` cache query on every changed CSS file in the HTML that loads it.
   - **Grep for the OLD value/wording** across the repo — it must return zero stray hits.
   - Run `/design-check` (or `python tools/check-spacing.py --all`) — must exit clean.
   - Verify in the preview server (`contact`, port 5173) at 360 / 393 px.

The full step-by-step with commands lives in the `/rule-change` skill. A change is only
"documented" when the grep is clean, the audit passes, and the changelog line exists.

## Required Imports

Every page must load the design system before page-specific styles:

```html
<link rel="stylesheet" href="design-system/colors_and_type.css" />
<link rel="stylesheet" href="design-system/portfolio.css" />
```

Page CSS should use the tokens from `:root` instead of hard-coded colors, fonts, radii, shadows, spacing, or motion.

## Brand Direction

The portfolio should feel sharp, minimal, experimental, premium, and personal. It is a designer portfolio, not a SaaS landing page.

Use:

- Warm paper background, near-black ink text, cream surfaces, and one orange accent.
- BDO Grotesk as the main typeface.
- Long scrolling sections with strong visual zones.
- Warm project photography and local portfolio assets.
- Flat layouts, tight spacing, and quiet interactions.

Avoid:

- Generic marketing hero sections.
- Blue, purple, beige-only, or multi-hue gradient palettes.
- Large rounded cards, nested cards, glass effects, decorative blobs, and heavy shadows.
- Stock-like imagery or abstract SVG hero art.
- Introducing new fonts unless the design system is intentionally expanded.

## Tokens

Use these CSS variables first:

- Figma color: `--color-orange-500`, `--color-orange-700`, `--color-white-500`, `--color-cream-50`, `--color-cream-100`, `--color-cream-200`, `--color-cream-700`, `--color-dark-700`, `--color-dark-900`, `--color-gray-100`, `--color-gray-200`, `--color-gray-300`, `--color-gray-400`, `--color-gray-500`, `--color-gray-800`
- Website color aliases: `--paper`, `--cream`, `--ink`, `--ink-soft`, `--ink-muted`, `--orange`, `--orange-warm`, `--white`
- Semantic color aliases: `--action-bg-primary-default`, `--action-bg-secondary-hover`, `--content-text-default-dark`, `--content-text-default-light`, `--surface-bg-page-default`
- Type: use professional role-based tokens first: `--type-size-hero`, `--type-size-statement`, `--type-size-section-title`, `--type-size-feature-title`, `--type-size-card-title`, `--type-size-row-title`, `--type-size-body`, `--type-size-body-small`, `--type-size-meta`, `--type-size-button-primary`, `--type-size-button-secondary`, `--type-size-button-tertiary`. The button typography tokens (`--type-size-button-*` and `--type-weight-button-*`) are reserved for **button text and hyperlinks only** — do not use them for paragraphs, labels, or other inline text.
- Spacing: `--space-1` through `--space-11`
- Radius: `--r-sm`, `--r-pill`, `--r-circle`
- Motion: `--ease-out`, `--ease-in-out`, `--dur-1`, `--dur-2`, `--dur-3`

Only create a new token when it will be reused across multiple components.

## Layout Rules

- Design mobile-first from the 393 px Figma width.
- Let page and frame height be content-driven; do not hard-code a Figma frame height or leave empty bottom space just to match the canvas.
- Use 16 px page gutters on mobile.
- Keep spacing between neighboring sections capped at 48 px from each section side, for a maximum combined gap of 96 px.
- Use the 4 px spacing grid.
- Use an 8 px rhythm for most visible spacing steps: 8, 16, 24, 32, 40, 48.
- Keep eyebrow-to-heading spacing at 8 px, heading-to-content spacing at 24-32 px, and card/list item spacing at 12-32 px depending on hierarchy.
- On project case-study pages, keep chapter labels close to their own content with a 16 px internal gap. Use 48 px between separate text chapters, 32 px before/after an inserted image row, and 16 px between images inside the row.
- Keep touch targets comfortable: primary buttons are 48 px high, secondary buttons may be 40 px visually but need a 48 px tap area, and tertiary buttons may be 32 px visually but need expanded tap area.
- Keep page sections full-width within the phone/site shell.
- Keep project media nearly square or portrait, with `4px` radius.
- Use pill radius only for buttons, chips, and tags.
- Header and footer patterns should remain consistent across pages.

## Type Rules

- Use BDO Grotesk for almost all text.
- Use Inter only where the existing footer/navigation pattern already uses it.
- Keep the home hero display type at `56px`, `108%` line height, and `0px` letter spacing on the 393 px mobile frame.
- Use uppercase tracked labels only for small eyebrows and meta labels.
- Do not scale font sizes with viewport width.
- Do not use negative letter spacing except where already defined in tokens.

## Page Structure And Text Hierarchy

Use this mobile-first hierarchy consistently across pages:

| Role | CSS token | Figma text style | Size | Line height | Weight | Use |
|---|---|---|---:|---:|---:|---|
| Hero display | `--type-size-hero` | `typography/Header/display-mobile\bold`, `typography/Header/display-mobile\reg` | `56px` | `108%` | `700/400 mix` | Home hero identity line only, max 3 short lines |
| Manifesto statement | `--type-size-statement` | `typography/Header/h1-mobile` | `42px` | `95%` | `700` | One emotional statement on visual/dark sections |
| Page or section heading | `--type-size-section-title` | `typography/Header/h3-mobile` | `36px` | `128%` | `600` | Main page title or section titles such as Projects, Experience, Skills |
| Feature list item | `--type-size-feature-title` | `typography/Header/h3-mobile-regular` | `32px` | `128%` | `400` | Skills and large scannable list rows |
| Card title | `--type-size-card-title` | `typography/Header/h5-mobile-bold` | `20px` | `128%` | `600` | Project cards and compact content titles |
| Row title | `--type-size-row-title` | `typography/body-lg-mobile-bold` | `18px` | `165%` | `600` | Experience roles and dense list titles |
| Body | `--type-size-body` | `typography/body-base-mobile` | `16px` | `160%` | `400` | Main readable paragraphs, email, text links |
| Supporting body / UI label | `--type-size-body-small`, `--type-size-button-secondary`, `--type-size-button-tertiary` | `typography/body-sm-mobile`, `typography/Button/Button-M-mobile`, `typography/Button/Button-S-mobile` | `14px` | `140-160%` | `400/600` | Chips, filters, dates, captions, footer links |
| Meta / eyebrow | `--type-size-meta` | `typography/small-mobile` | `12px` | `150%` | `400` | Counters, section labels, short uppercase labels |

- Each page gets one visible `h1`; major sections use `h2`; card/list titles use `h3` only when they introduce content below.
- Keep headings left-aligned on mobile except short footer/contact moments.
- Do not use `56px` outside the home hero; use `36px` for normal page and section titles.
- Body text should not go below `16px` for important reading. Use `14px` only for secondary UI text and `12px` only for meta labels.
- The current Figma scale works well as a compact portfolio ladder: `56`, `42`, `36`, `32`, `20`, `18`, `16`, `14`, `12`.
- Use role-based utility classes such as `.type-hero`, `.type-section-title`, `.type-card-title`, `.type-body`, `.type-meta`, and `.type-button-primary`. Legacy `.t-h*` classes stay available only for existing code.

## Component Rules

Reuse these existing classes where possible:

- Header: `.pk-header`, `.pk-avatar`, `.pk-menu-btn`
- Conversion CTA (animated): `.pk-btn` — reserved for hero, footer, and contact submit only
- Primary action (filled, no animation): `.pk-btn.on-dark.filled`
- Secondary action (outline): `.pk-btn.ghost`
- Text/Link: `.pk-link`
- Toggle / selectable chip (selection control): `.pk-toggle` in a `role="radiogroup"`
- Decorative tag (non-interactive label): `.pk-tag` (bordered chip) or `.pk-tag-meta` (uppercase tracked inline-meta text, no pill)
- Tag-meta text: `.pk-tag-meta` — shared role for project-card tag meta and About-page skills (pipe-separated). About skills use this inline text, not `.pk-tag` pills.
- Segmented control: `.pk-seg`
- Project cards: `.pk-card`, `.pk-tags`, `.pk-tag`
- Experience section: `.pk-experience`, `.pk-xp`
- Skills rows: `.pk-skill`, `.pk-skill-name`, `.pk-skill-num`
- Manifesto/footer: `.pk-footer-bg`, `.pk-footer-black`

When a page needs a variant, extend it with a page prefix such as `.hm-`, `.about-`, or `.contact-` instead of changing shared classes in a way that breaks other pages.

## Website Navigation

- Main website navigation contains only: Home, Work, About, Contact.
- Do not add individual project links to the main navigation or footer navigation.
- Users open a project by clicking its project card.
- Project cards must behave as links to the project detail or case-study page.
- Generate project cards from `projects-data.js` and render them with the shared `ProjectCard` component in `components/project-card.jsx`; do not hard-code a second project list or recreate card markup in page components.
- Project card links use `case-study.html?project={project-id}` so one master project page can render multiple projects.
- Project filters read the project `tags` array. Home filters are only `All`, `UI/UX`, and `3D`.
- Show only the first three matching home project cards by default — except in the `900–1179.98px` (2-column) range, where **four** show so the grid fills two even rows (2 + 2) instead of an uneven 2 + 1. Mobile and `≥1180px` keep 3. The default count is driven by a `matchMedia` query in `HmProjects`; the `All projects` text button expands the rest and can collapse back to `Show less`.
- Do not show project year on project cards or in the project page meta block.

## Project Media Rules

- Project media lives in `design-system/assets/{project-id}` so GitHub Pages can serve it with the site.
- Use repo-relative media paths, for example `design-system/assets/beer-box/cr.webp`.
- Use `cr.*` as the project card cover image.
- Use `hr.*` as the project page hero image when it exists.
- If a project folder has no `hr.*`, use `cr.*` as both cover and hero.
- Use `g-01.*`, `g-02.*`, and following `g-*` files as gallery images in filename order.
- Keep project folder names aligned with `PROJECT ID` / `slug` whenever possible.
- Project hero frames auto-select from the source image ratio. If a wide UI mockup is badly cropped, set `heroFit: "contain"` in `projects-data.js`. Use `heroPosition` for manual focal points when keeping `cover`.
- Project hero and gallery responsive ratios are: `wide` -> `16 / 9`, `square` -> `1 / 1`, `portrait` -> `4 / 5`.
- Gallery image captions are hidden by default. Keep the markup, but only show image numbers/descriptions for a project when `showGalleryCaptions: true` is set in `projects-data.js`.
- Gallery image stacks use a `16px` vertical gap between image items when captions are hidden; do not rely on caption height for spacing.
- Gallery blocks inserted between text sections use `32px` outside spacing before and after the image row. Text chapter to text chapter uses `48px`; chapter label to its body content uses `16px`.

## Buttons And Interaction

### Button taxonomy (two axes)

There are two independent axes — do not mix them:

1. **Action buttons** (do something), ranked by emphasis:
   - **Conversion CTA** `.pk-btn` — the animated orange-lozenge button. **Reserved** for the single conversion action: home hero, footer, and the contact-form submit. Do not use it on dialogs, banners, or anywhere else (it dilutes the signature animation).
   - **Primary action** `.pk-btn.on-dark.filled` — solid filled, no animation. The "main action here" inside a dialog/form when it is not the conversion CTA.
   - **Secondary action** `.pk-btn.ghost` — outline pill.
   - **Text** `.pk-link` — low-emphasis, text-only.
   - (A Tertiary pill is spec'd in the design-system README but not currently implemented in CSS — add it back from git history if a use appears.)
2. **Selection controls** (pick from a set) — a separate axis, NOT an emphasis level:
   - **Toggle / chip** `.pk-toggle` inside a `role="radiogroup"` (single-select). The chosen option carries `aria-checked="true"`; selected styling keys off `[aria-checked="true"]`, never a manual `.active` class. Use roving `tabindex` + arrow-key navigation. "Selected" is a state, not "secondary."

**Decorative tags** (`.pk-tag`) are labels, not controls: no `cursor: pointer`, no hover/press, no button role. Never give a non-interactive label a clickable affordance.

**Cookie/consent banners:** Accept and Reject must be equal visual weight (anti-dark-pattern); the lowest-priority option (e.g. Cookie settings) is the Text/Link tier.

- Primary buttons must use `.pk-btn`; do not make another primary CTA style.
- CTA width is canonical and content-driven: `.pk-btn` (not `.ghost`) is full-width on mobile and `fit-content` (min `280px`, max `352px`) from `640px` up. This lives once in `portfolio.css` so every CTA — hero, footer, contact submit — renders the same width regardless of its container. Do not override `.pk-btn` width per page or per container; that reintroduces drift and makes CTAs diverge.
- Default primary state: `48px` high pill, `--ink` background, cream label, orange arrow. Horizontal padding is `48px`.
- Hover state: keep the dark pill, expand the `--orange` lozenge (inset `24px` from each pill end), switch label and arrow to ink, and add a small pop with `translateY(-2px) scale(1.012)` plus a soft shadow.
- Active state: same `24px`-inset `--orange` lozenge as hover (not a full-bleed orange pill), ink label and arrow, `scale(0.985)`, warm shadow.
- Orange-margin rule: whenever the orange background shows, keep a min `24px` gap from the label/icon to the orange AND a min `24px` gap from the orange to the pill edge (hence `48px` padding + `24px`-inset lozenge).
- Disabled state: `--hair` background, cream label at 60% opacity, hidden hover lozenge, no pop.
- Only Primary may use the centered orange expansion/lozenge animation. Secondary and Tertiary buttons must not use an orange pseudo-element expanding from the center.
- Focus must be visible with orange.
- Keep animations quiet: no bouncing, springing, or flashy transitions.

### Text/Link Button (4th role)

- Use `.pk-link` for inline navigation links and text-only buttons such as `View all projects` or `More about me`.
- No background, no border, no padding — just the typography of `--type-size-button-secondary` / `--type-weight-button-secondary` in ink.
- Default state shows no underline. On hover, a 1 px ink underline animates in from the left (`scaleX(0)` → `scaleX(1)` over `~280ms`, `--ease-out`) and sits 2 px below the baseline.
- Active state dims color to `--ink-soft`. Disabled is `--color-cream-700` with the underline hidden.
- Do not use a permanent solid border-bottom for these links — the role is the animated underline.
- This typography role (button-secondary tokens) is the only style used for hyperlinks anywhere on the site.

## Icon And Asset Rules

- Prefer local icons from `design-system/assets/icons/`.
- Approved external icon source: Lucide icons from https://github.com/lucide-icons/lucide.git.
- Use Lucide style for any new icon.
- Do not hand-draw custom icons when a Lucide icon exists.
- Use local images first:
  - `avatar.jpg`
  - `footer-bg.jpg`
  - `hero-bg-motion-blur.mp4`
  - `work-reel.png`
  - `{project-id}/cr.*`
  - `{project-id}/hr.*`
  - `{project-id}/g-*.*`
- Do not add remote images when a local asset can serve the job.

## Voice And Copy

Voice is first-person, warm, and quietly confident.

Prefer:

- "Let's create"
- "View all projects"
- "More about me"
- "Designing with purpose, always."
- Concrete role language such as "UI/UX Design", "3D Design", "Arch-Vis.", "Communication designer"

Avoid:

- "Hire me"
- "Get started"
- Corporate or generic slogans
- Exclamation-heavy copy

## Quality Checklist

Before finishing website edits:

- Confirm every page still imports the design-system CSS.
- Check that new colors come from tokens.
- Check that text does not overlap or overflow on mobile.
- Check that images render from local paths.
- Check that buttons, links, and the nav overlay remain usable.
- Run a browser preview for visual changes when possible.
