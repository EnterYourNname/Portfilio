# Claude Website Design System Rules

Use this file as the working contract for building and editing the website in this folder.

## Source Of Truth

- Primary frame: `166:1382` (`V02`, mobile 393 px wide; height must fit the live content)
- Local tokens: `design-system/colors_and_type.css`
- Shared UI patterns: `design-system/portfolio.css`
- Assets: `design-system/assets/`

If Figma and code differ, keep the code usable first, then align the visual details back toward Figma.

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
- Primary CTA: `.pk-btn`
- Tertiary CTA: `.pk-btn.tertiary`
- Text/Link: `.pk-link`
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
- Show only the first three matching home project cards by default. The `All projects` text button expands the rest and can collapse back to `Show less`.
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

- Primary buttons must use `.pk-btn`; do not make another primary CTA style.
- Default primary state: full-width or container-width `48px` high pill, `--ink` background, cream label, orange arrow.
- Hover state: keep the dark pill, expand a centered `--orange` lozenge to 60% button width, switch label and arrow to ink, and add a small pop with `translateY(-2px) scale(1.012)` plus a soft shadow.
- Active state: full `--orange` pill, ink label and arrow, `scale(0.985)`, warm shadow.
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
