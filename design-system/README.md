# Portfolio Design System

This design system translates the Figma `V02` mobile portfolio width into reusable local website rules, tokens, styles, and assets.

## Source

- Primary node: `166:1382`
- Canvas width: 393 px mobile reference; height must fit the live content, not a fixed Figma frame number
- Minimum frame: 360 px width. The design must be fully responsive and adapt gracefully down to 360 px without horizontal scrolling, overlap, or text overflow.
- Main flow: header, hero, highlight strip, work reel, projects, experience, skills, manifesto, footer

## Files

- `colors_and_type.css` - font faces, CSS variables, type utilities, surface helpers
- `portfolio.css` - shared portfolio UI components and layout patterns
- `fonts/` - local BDO Grotesk font files
- `assets/` - portfolio imagery and icons

## Foundations

### Color

The CSS includes the local Figma color variables as `--color-*` tokens:

| Figma variable | CSS token | Value |
|---|---|---|
| `Color/Orange/500` | `--color-orange-500` | `#FF8A36` |
| `Color/Orange/700` | `--color-orange-700` | `#FF6B4A` |
| `Color/White/500` | `--color-white-500` | `#FFFFFF` |
| `Color/Cream/50` | `--color-cream-50` | `#FCF9F1` |
| `Color/Cream/100` | `--color-cream-100` | `#FFF5E8` |
| `Color/Cream/200` | `--color-cream-200` | `#F7E9D2` |
| `Color/Cream/700` | `--color-cream-700` | `#E3DFDA` |
| `Color/Dark/700` | `--color-dark-700` | `rgba(38, 37, 36, 0.80)` |
| `Color/Dark/900` | `--color-dark-900` | `#1B1814` |
| `Color/Gray/100` | `--color-gray-100` | `#FAFAFA` |
| `Color/Gray/200` | `--color-gray-200` | `#F2F2F2` |
| `Color/Gray/300` | `--color-gray-300` | `rgba(27, 24, 20, 0.08)` |
| `Color/Gray/400` | `--color-gray-400` | `rgba(27, 24, 20, 0.10)` |
| `Color/Gray/500` | `--color-gray-500` | `#BCBCBC` |
| `Color/Gray/800` | `--color-gray-800` | `#7C736B` |

The website also keeps friendly aliases:

- Paper: `--paper` (`rgb(255, 252, 244)`) for the warm V02 frame background
- Ink: `--ink`, mapped to `--color-dark-900`
- Cream: `--cream`, mapped to `--color-cream-100`
- Orange: `--orange`, mapped to `--color-orange-500`
- Warm orange: `--orange-warm`, mapped to `--color-orange-700`

Use orange sparingly: counters, warm dividers, focus, and CTA accents.

Semantic Figma aliases are also available in CSS, including `--action-bg-primary-default`, `--action-bg-secondary-hover`, `--content-text-default-dark`, `--content-text-default-light`, and `--surface-bg-page-default`.

### Type

- Main family: BDO Grotesk
- Alternate family: Inter, only for the existing footer/navigation pattern
- Main weights: regular `400`, demi `600`, bold `700`
- Display sizes: 56, 42, 36, 32, 20, 18, 16, 14, 12 px

Small labels use uppercase text with light tracking. Body copy should stay readable and calm.

Mobile type hierarchy:

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

Use one visible `h1` per page. Major sections use `h2`; project titles and list item titles use `h3` only when they introduce content below. Keep normal page and section titles at `36px`; reserve `56px` for the home hero so hierarchy stays clear. Use role-based utility classes such as `.type-hero`, `.type-section-title`, `.type-card-title`, `.type-body`, `.type-meta`, and `.type-button-primary`. Legacy `.t-h*` classes stay available only for existing code.

**Button typography is also the hyperlink typography.** The `--type-size-button-*` / `--type-weight-button-*` tokens (Button-L, Button-M, Button-S in Figma) are reserved for button labels **and** inline hyperlinks — text-only buttons (`.pk-link`) share this scale. Do not use these tokens for paragraphs, eyebrows, captions, or other inline text.

#### Responsive Typography Scaling

Typography scales up significantly on larger screens to fill the expanded canvas, governed primarily via media queries.

| Role | Small Mobile (<392px) | Standard Mobile (Default) | Desktop (≥900px) | Large Desktop (≥1180px) |
|---|---|---|---|---|
| **Hero display** | `48px` - `50px` | `56px` | `96px` | `104px` |
| **Statement** | `42px` | `42px` | `56px` | `56px` |
| **Section heading** | `36px` | `36px` | `48px` | `48px` |
| **Feature list item**| `32px` | `32px` | `40px` | `40px` |
| **Mobile Menu overlay**| `44px` | `44px` | *(Replaced by desktop nav)* | *(Replaced by desktop nav)* |
| **Card title** | `20px` | `20px` | `24px` | `24px` |
| **Row title** | `18px` | `18px` | `20px` | `20px` |
| **Body text** | `16px` | `16px` | `18px` | `18px` |
| **Primary Buttons**| `16px` | `16px` | `16px` (Fixed) | `16px` (Fixed) |
| **Meta / Desktop Nav**| `12px` | `12px` | `16px` | `16px` |
| **Secondary/Link Buttons**| `14px`| `14px`| `14px` (Fixed) | `14px` (Fixed) |

### Spacing

**The 4 px step is mandatory.** Every spacing value in the system — padding, margin, `gap`, and offsets — must be a multiple of 4 px. No off-grid values (no `10px`, `14px`, `33px`, etc.); round to the nearest step instead. This applies to component internals too: a button's label-to-icon gap is `8px`, not `10px`.

Approved steps: `4, 8, 12, 16, 24, 32, 40, 48, 64 px`. Prefer the 8 px rhythm (`8, 16, 24, 32, 40, 48`) for most visible spacing; use `4px` and `12px` only for tight internal rhythm. Use the `--space-1`…`--space-11` tokens rather than hard-coding pixels wherever a token exists.

Mobile pages use 16 px side gutters. Spacing between neighboring sections must be no more than 48 px from each section side, so the combined gap between two sections must never exceed 96 px.

Mobile spacing rules for this portfolio:

| Use | Spacing |
|---|---|
| Page side gutter | `16px` |
| Full-bleed media exception | Hero, image strips, dark bands, and manifesto backgrounds may touch the viewport edge |
| Major section padding | `48px` top and `48px` bottom max per section side |
| Combined section gap | `96px` max between neighboring sections |
| Section eyebrow to heading | `8px` |
| Heading to main content | `24px` or `32px` |
| Related text lines or meta rows | `4px` or `8px` |
| Case-study chapter label to content | `16px` |
| Case-study text chapter to next text chapter | `48px` |
| Case-study image row before/after text | `32px` |
| Case-study image row internal gap | `16px` |
| Button/icon gap | `8px` |
| Button groups/chip rows | `8px` to `12px` |
| Project card media to title/meta | `16px` |
| Project card to project card | `32px` |
| List rows, skills, experience rows | `12px` to `16px` internal rhythm |
| Touch target visual minimum | Primary: `48px`; Secondary: `40px` visual with `48px` tap area; Tertiary: `32px` visual with expanded tap area |
| Adjacent touch targets | At least `8px` visual separation where possible |

Spacing should feel editorial and compact, not like a generic marketing landing page. Avoid oversized `120px+` vertical gaps on mobile.

### Responsive Layout Structure

To maintain readability and proportion across devices, structural information must adapt to the viewport width:

- **Mobile (360px - 767px):**
  - Use a single-column layout.
  - Page gutters are `16px`.
  - Elements and text blocks should span full width minus gutters.
  - Keep headers, paragraphs, and lists left-aligned.

- **Tablet (768px - 1023px):**
  - Page gutters expand (e.g., `32px` or `48px`).
  - Text lines should not exceed comfortable reading lengths; apply a `max-width` of around `65ch` or `680px` to main text blocks.
  - Cards, project lists, and image galleries may transition to a 2-column grid.

- **Desktop (1024px and wider):**
  - Introduce larger side margins to center the page content.
  - A maximum container width (e.g., `1200px` or `1440px`) should wrap the main sections.
  - Project lists or feature grids can expand to 3 or 4 columns.
  - Preserve the `max-width` on long reading text (like case-study body copy) to prevent exhausting eye travel. Let images and media break wider than text columns when appropriate.

### Radius

The system uses only three radii:

- `--r-sm`: 4 px for media cards
- `--r-pill`: 99 px for buttons, chips, tags, and segmented controls
- `--r-circle`: 50% for avatars and circular controls

Avoid new intermediate radii.

### Motion

Use quiet transitions:

- `--dur-1`: 120 ms for press/tap
- `--dur-2`: 200 ms for hover
- `--dur-3`: 360 ms for reveal or larger transitions
- `--ease-out` for most UI movement
- `--ease-in-out` for color swaps

## Components

### Header

Use `.pk-header`, `.pk-avatar`, and `.pk-menu-btn`. The avatar is circular, the menu button is an ink pill, and both sit on the mobile 64 px header rhythm.

Website navigation contains only Home, Work, About, and Contact. Do not place individual projects in the main navigation or footer navigation; project detail pages are opened by clicking project cards.

### Button taxonomy (start here)

Buttons live on **two independent axes** — never collapse one into the other:

**1. Action buttons** — they *do* something. Ranked by emphasis:

| Role | Class | Animated | Use |
|---|---|---|---|
| **Conversion CTA** | `.pk-btn` | ✅ orange lozenge | The single conversion action. **Reserved** for home hero, footer, and contact submit — nowhere else. |
| **Primary action** | `.pk-btn.on-dark.filled` | ❌ | The main action inside a local context (dialog/form) when it is *not* the conversion CTA. |
| **Secondary action** | `.pk-btn.ghost` | ❌ | Supporting / alternative actions. Context-aware outline pill. |
| **Text / Link** | `.pk-link` | ❌ | Inline links and text-only buttons; lowest emphasis. |

**2. Selection controls** — they let you *pick* from a set. "Selected" is a state, NOT an emphasis level:

| Role | Class | Use |
|---|---|---|
| **Toggle / chip** | `.pk-toggle` in `role="radiogroup"` | Single-select option groups (e.g. project filters). The chosen option carries `aria-checked="true"`. |

**Decorative tags** (`.pk-tag`) are a third thing entirely: non-interactive labels (skills, meta). They are not controls — see *Decorative Tag* below.

Core rules:

- **The animated CTA is reserved.** Only `.pk-btn` uses the centered orange lozenge expansion, and only in its three reserved spots. Every other "main action" uses the non-animated **Primary action** tier.
- **Emphasis ≠ selection.** A "selected" look belongs to `.pk-toggle` via `[aria-checked="true"]`, never a `.active` class on an action button.
- **Don't fake affordances.** A non-interactive label must not carry `cursor: pointer`, a hover/press state, or a button role.
- **One main action per context.** Each screen or dialog gets a single highest-emphasis action; everything else steps down a tier.
- **Consent banners are the exception:** Accept and Reject must be *equal* weight (anti-dark-pattern); the lowest-priority option (e.g. Cookie settings) drops to the Text/Link tier.

The sub-sections below are the detailed spec for each role.

### Conversion CTA (`.pk-btn`)

Use `.pk-btn` for the **conversion CTA** — the single most important action. It is **reserved** for the home hero, the footer, and the contact-form submit; do not use it on dialogs, banners, or supporting actions. The signature lozenge animation only stays meaningful if it is rare. Label copy can be dynamic (`Let's create`, `Contact me`, `Send`). The arrow should use a local Lucide-style arrow icon or the existing inline arrow pattern.

Figma source: `Button` component set, node `169:2128`, `Property 1=Primary`.

Base settings:

| Property | Value |
|---|---|
| Default component size | `361px x 48px` |
| Height | `48px` |
| Width | Canonical & content-driven: full-width on mobile, `fit-content` (min `280px`, max `352px`) from `640px` up. Defined once on `.pk-btn:not(.ghost)`; never overridden per page — so hero, footer, and contact submit all render the same width regardless of container. |
| Radius | `99px` |
| Padding | `0 48px` (height-locked to `48px`; horizontal `48px` reserves room for the orange-margin rule below) |
| Orange fill inset | `24px` from each pill end (the animated orange `::before` lozenge never reaches the edge) |
| Gap | `8px` between label and icon |
| Font | `BDO Grotesk DemiBold` |
| Font size | `16px` |
| Font weight | `600` |
| Line height | `160%` |
| Letter spacing | `0.16px` |
| Icon | Lucide arrow-right, `16px` frame, orange `2px` stroke |

Primary button states:

| State | Background / fill | Text/icon | Motion |
|---|---|---|---|
| Default | Adapts to container: `--ink` on light backgrounds, `--cream` on dark backgrounds. No borders. | Adapts to container: `--cream` on light backgrounds, `--ink` on dark backgrounds. Orange arrow. | Flat pill |
| Hover | Default pill background with the orange lozenge expanded. The lozenge is **inset 24px** from each end, so it never touches the pill edge. | Ink label and arrow | `scaleX(0 → 1)` lozenge expansion from center; may add `translateY(-2px) scale(1.012)` plus soft pop shadow |
| Active | Same inset orange lozenge as hover (**not** a full-bleed orange pill) — keeps the 24px edge margins. | Ink label and arrow | Pressed scale around `0.985` |
| Focus | Same as current state | Same as current state | 2 px orange outline, 3 px offset |
| Disabled | `#BCBCBC` / `--color-gray-500` | Disabled cream label `#E3DFDA`, arrow muted or hidden | No motion or shadow |

**Orange-margin rule (CTA only):** when the animated orange background appears (hover, active, and the touch `--touching`/`--tapped` states), it must keep a **minimum 24px gap to the label/icon** and a **minimum 24px gap to the pill edge**. This is why the CTA uses `48px` horizontal padding and a `24px`-inset `::before` lozenge instead of a full-bleed fill. Both values are on the 4px grid.

**Dark vs. Light Containers:**
- **Light Contexts (e.g., Paper background):** Primary buttons use an `--ink` fill with a `--cream` label.
- **Dark Contexts (e.g., Experience section, Footer):** Primary buttons adapt by flipping to a `--cream` fill with an `--ink` label to maintain contrast.
- The orange lozenge (hover and active) and its 24px margins remain identical across both contexts.

Do not create a second CTA style. If a context needs the conversion CTA, use `.pk-btn` and inherit this state model. If it needs a *main action that is not the conversion CTA*, use the Primary action tier below.

Button animation rule: only `.pk-btn` may use the centered orange lozenge expansion. No other role — Primary action, Secondary, Toggle — may use an orange pseudo-element expanding from the center.

### Primary action (`.pk-btn.on-dark.filled`)

The non-CTA "main action" tier: a **solid filled pill, no animation**. Use it for the single most important action inside a local context (a dialog, a form step, a modal) when that action is not the reserved conversion CTA — filled for emphasis, but without the lozenge so it never competes with the CTA.

| Property | Value |
|---|---|
| Fill | `--cream` on dark surfaces (flips with context) |
| Label | `--ink` |
| Height / radius | `48px` / `99px` pill |
| Motion | none (no lozenge); subtle fill shift on hover/active only |

Currently defined and **reserved** — wire it up the first time a non-CTA main action appears. Do not reach for `.pk-btn` (animated) in those cases.

### Secondary action (`.pk-btn.ghost`)

Use the secondary action for supporting / alternative actions (Decline / accept pairs, non-primary choices). It stays quieter than the conversion CTA but reads clearly as a button. Class: `.pk-btn.ghost` (shared, in `portfolio.css`).

It is **context-aware**: it reads `--ghost-*` surface tokens set on the container, so the *same* class works on light and dark backgrounds with no modifier. There is no persistent "selected" state on this role — selection lives on `.pk-toggle` (see below).

Base settings:

| Property | Value |
|---|---|
| Height | `40px` |
| Radius | `99px` |
| Padding | `12px 24px` |
| Font | `BDO Grotesk DemiBold`, `14px` / `600` |
| Letter spacing | `0.16px` |

Secondary (ghost) states — colours resolve from the container's `--ghost-*` tokens (light surface shown):

| State | Background | Border | Label | Motion |
|---|---|---|---|---|
| Default | `--ghost-bg` (`--color-cream-50` light / transparent dark) | `1px solid --ghost-border` | `--ghost-color` (ink / cream) | Flat pill |
| Hover | `--ghost-bg-hover` | `--ghost-border-hover` | same | `translateY(-1px)` |
| Active | `--ghost-fill` | `--ghost-fill` | `--ghost-fill-color` | `scale(0.98)` |
| Focus | unchanged | unchanged | unchanged | 2 px orange `:focus-visible` outline, 3 px offset |
| Disabled | unchanged | unchanged | dimmed (35% opacity) | none |

Do not add a persistent toggled fill to `.pk-btn.ghost`; if you need a chosen/selected state, you want `.pk-toggle`.

### Tertiary Button (spec only — not currently implemented)

> The Tertiary pill below is a Figma-spec'd role kept for reference, but its CSS was removed because nothing used it. Re-add `.pk-btn.tertiary` from git history if a real use appears; until then, use Secondary (`.pk-btn.ghost`) or Text/Link (`.pk-link`).

Use the tertiary button for compact, low-emphasis actions where the user already understands the context: small navigation actions, quiet inline CTAs, back/top controls, and supporting links that still need a pill shape.

Figma source: `Button` component set, node `169:2128`, `Property 1=Tertiary`.

Base settings:

| Property | Value |
|---|---|
| Width from Figma | `186px` |
| Height | `32px` |
| Radius | `99px` |
| Padding | `12px 16px` in Figma; keep CSS visually locked to `32px` height |
| Gap | `8px` between label and icon |
| Font | `BDO Grotesk Regular` |
| Font size | `14px` |
| Font weight | `400` |
| Line height | `140%` |
| Letter spacing | `0.16px` |
| Icon | Lucide arrow-right, `16px` frame, orange `2px` stroke |

Tertiary button states:

| State | Background | Border | Text/icon | Motion |
|---|---|---|---|---|
| Default | Transparent | `1px solid --ink` | Ink label, orange arrow | Flat pill |
| Hover | Transparent | `1px solid --ink` | Ink label, orange arrow | No color change from Figma; optional `translateY(-1px)` only if needed |
| Active | Transparent | `1px solid --ink` | Ink label, orange arrow | `scale(0.98)` |
| Disabled | Transparent | `1px solid --color-gray-500` | `--color-cream-700` label, muted orange or hidden arrow | No motion |

Do not use the tertiary button for primary page actions. If the action moves the user forward in a main flow, use Primary or Secondary instead.

### Text/Link Button

Use the text/link role for inline navigation links and text-only buttons where the surrounding layout already provides enough emphasis: `View all projects` on the home Work section, `More about me` on the about page, footer email link, in-body hyperlinks.

It is the fourth and lightest button role — no fill, no border, just typography with a hover affordance.

Class: `.pk-link` (shared, in `portfolio.css`).

Base settings:

| Property | Value |
|---|---|
| Height | Hugs content (no fixed height) |
| Padding | `0` |
| Background | None |
| Border | None |
| Gap | `8px` between label and optional arrow |
| Font | `BDO Grotesk DemiBold` |
| Font size | `14px` (`--type-size-button-secondary`) |
| Font weight | `600` |
| Line height | `140%` |
| Letter spacing | `0.16px` |
| Color | `--ink` |
| Icon | Optional Lucide arrow-right, `14px`, currentColor stroke |

Text/Link states:

| State | Color | Underline | Motion |
|---|---|---|---|
| Default | `--ink` | None | Flat |
| Hover | `--ink` | 1 px line at `bottom: -2px`, `scaleX 0 → 1` from left, `280ms --ease-out` | Underline reveals from left |
| Active | `--ink-soft` | Same as Hover | No scale |
| Focus | `--ink` | Same as Hover | No outline (underline carries focus) |
| Disabled | `--color-cream-700` | Hidden | None |

Rules:

- Use this role **only** for hyperlinks and text-only buttons. If the action needs more visual weight, step up to the Conversion CTA, Primary action, or Secondary instead.
- Never reach for `text-decoration: underline` on a hyperlink — let `.pk-link` carry the animated underline.
- Never give text links a permanent solid border-bottom; the animated reveal is the role.
- The role borrows the Button-M typography tokens (`--type-size-button-secondary`, `--type-weight-button-secondary`). This is the single typography style used for hyperlinks across the site.

### Toggle / Selectable Chip (selection control)

Use `.pk-toggle` for single-select option groups such as the home project filters. This is a **selection control**, not an action button — keep it off the primary/secondary/tertiary emphasis ladder.

- Wrap the options in a container with `role="radiogroup"` and an `aria-label`; each option is a `<button class="pk-toggle" role="radio">`.
- The chosen option carries `aria-checked="true"`; the filled "selected" styling keys off `[aria-checked="true"]` (never a manual `.active` class), so the visual and the accessible state share one source of truth.
- Use roving `tabindex` (selected = `0`, others = `-1`) and arrow-key navigation (←/→/↑/↓ move selection and focus, wrapping at the ends).
- The chip is context-aware (light/dark) via the container's `--ghost-*` tokens; the selected hover is the warm cream `#FFF0DD`.

### Decorative Tag (non-interactive label)

Tags come in two non-interactive forms — pick by how much visual weight the label needs:

- **`.pk-tag` (chip):** bordered pill for labels that should stand apart — interests, case-study hero tags. Must **not** look or behave like a button: no `cursor: pointer`, no hover/press, no button role. `cursor` is left to inherit, so a tag inside a clickable card shows the card's pointer while a standalone tag shows the default cursor. Do not create per-page chip styles (`.am-skill-chip`, `.am-chip` were retired into `.pk-tag`).
- **`.pk-tag-meta` (inline text):** uppercase, tracked, muted text — no pill. The quiet inline-meta counterpart, used for **project-card tag meta** and **About-page skills** (pipe-separated, e.g. `UI/UX DESIGN | 3D DESIGN | …`). Use this when tags should read as quiet metadata rather than discrete chips. `.pk-project-card-tags` is an instance of this shared role.

### Accessibility & focus (applies to every control)

Every interactive control must meet this baseline; decorative elements must avoid faking it.

- **Visible focus on everything interactive.** All buttons, links, toggles, and icon controls show a `:focus-visible` ring: `outline: 2px solid var(--orange); outline-offset: 3px`. The only exception is `.pk-link`, whose animated underline carries focus instead. Never globally remove outlines (`*:focus { outline: none }` is banned); form fields that drop the native outline must replace it with their own focus border.
- **Use the right element.** Actions are `<button>`; navigation is `<a>`. Do not put `onClick` on a `<div>`/`<span>` and bolt on `role`/`tabindex` unless unavoidable. A non-interactive label stays a plain `<span>` with no role.
- **Toggle groups use the radiogroup pattern.** Container `role="radiogroup"`; options `role="radio"` + `aria-checked`; roving `tabindex` (selected `0`, rest `-1`); arrow keys move selection and focus. Style the selected option from `[aria-checked="true"]`, never a manual class — one source of truth for state and visuals.
- **State, not duplicate classes.** Drive selected/pressed/expanded styling off the ARIA attribute (`[aria-checked]`, `[aria-pressed]`, `[aria-expanded]`) so assistive tech and the visual never drift apart.
- **Decorative ≠ interactive.** If it does nothing, it must not look clickable: no pointer cursor, no hover, no focusability.
- **Contrast & hit area.** Keep label/background contrast ≥ 4.5:1, and the tap target ≥ 44 px even when the pill is visually shorter (use padding or a pseudo-element to expand the hit area).
- **Consent banners:** Accept and Reject are equal-weight peers; the quiet option is Text/Link. Do not visually privilege Accept (dark-pattern / non-compliant).

### Project Card

Use `.pk-project-card` for the main card link container. The image container uses `.pk-project-card-img` with a 4 px radius. The transparent rectangle overlay with blur (where the title and tags sit over the image) is called `.pk-project-card-body`. Inside the body, use `.pk-project-card-tags` for the small uppercase meta labels (an instance of the shared `.pk-tag-meta` role) and `.pk-project-card-title` for the sentence-case title.

Each project card must behave as a link to its project detail or case-study page. Project navigation belongs on the cards, not in the main website navigation.

Project cards should be generated from `projects-data.js` and rendered with the shared `ProjectCard` component in `components/project-card.jsx`. Do not hard-code a separate card list or recreate the card markup in page components. Each project needs an `id`, `title`, `tags`, `meta`, `cover`, `hero`, `gallery`, and `body`. Card links use `case-study.html?project={project-id}` so the same project page template can load different projects. Do not show the project year on cards or in the project page meta block.

Project filters use the project `tags` array. Use only `All`, `UI/UX`, and `3D` on the home page. Selecting a filter shows matching cards and keeps the selected state until another filter is clicked. The home page shows the first three matching projects by default — except in the `900–1179.98px` (2-column) range, where four show so the grid fills two even rows (2 + 2) rather than an uneven 2 + 1 (mobile and `≥1180px` keep 3, driven by a `matchMedia` query in `HmProjects`). The `All projects` text button expands the rest and can collapse back to `Show less`.

Project media should live in `design-system/assets/{project-id}` so GitHub Pages can serve it with the site. Use repo-relative paths such as `design-system/assets/beer-box/cr.webp`. Use `cr.*` as the project card cover, `hr.*` as the project page hero, and `g-01.*`, `g-02.*`, etc. as gallery images. If a folder has no `hr.*`, use `cr.*` as both cover and hero.

### Experience

Use a dark ink section with cream text and orange dividers. Dates are secondary and right-aligned when space allows.

### Skills

Use large regular-weight skill labels with small two-digit counters. Rows have ink dividers and orange counters when matching the Figma frame.

### Manifesto Footer

Use `footer-bg.jpg`, dark overlays, the manifesto line `Designing with purpose, always.`, email contact, social links, and compact footer navigation.

## Assets

All website assets must stay inside `design-system/assets/` so the site can be published on GitHub Pages without broken local-drive links.

Use paths from the website root when writing HTML, CSS, or project data:

- `design-system/assets/avatar.jpg`
- `design-system/assets/footer-bg.jpg`
- `design-system/assets/work-reel.png`
- `design-system/assets/{project-id}/cr.*`
- `design-system/assets/{project-id}/hr.*`
- `design-system/assets/{project-id}/g-01.*`

From files inside the `design-system/` folder, the same assets may be referenced as `assets/...`.

Project media folders should match the project id / slug:

- `beer-box/`
- `vvs/`
- `mealmate/`
- `kuckoo-configurator/`
- `caccaro-design-concept/`
- `online-configurator-for-smina-shelws/`
- `poster-for-smina/`
- `private-house-interior-concept/`

Inside each project folder, use `cr.*` for the card cover, `hr.*` for the project hero, and `g-01.*`, `g-02.*`, etc. for gallery images. If `hr.*` is missing, use `cr.*` as both cover and hero.

For project heroes, the page automatically chooses a standard image frame from the image ratio. If an image is a wide UI mockup or the crop cuts important content, add `heroFit: "contain"` in `projects-data.js`. Use `heroPosition` only when a cover crop needs a manual focal point, for example `"center bottom"` or `"70% center"`.

Project hero and gallery images use three standard responsive ratios:

- `wide` -> `16 / 9`
- `square` -> `1 / 1`
- `portrait` -> `4 / 5`

Use these same ratios for new project media layouts unless a specific design frame requires an exception.

Gallery image captions are hidden by default on project pages. Keep the caption markup available, but only show image numbers and descriptions for a specific project when `showGalleryCaptions: true` is set in `projects-data.js`.

Gallery image stacks use a `16px` vertical gap between image items when captions are hidden. Do not rely on caption height to create image spacing.

When a gallery block is inserted between text sections, use `32px` outside spacing before and after the image row. Text chapter to text chapter uses `48px`, while the chapter label stays close to its own body copy with a `16px` internal gap. This follows the proximity rule: related information sits closer together than separate topics.

Icons live in `assets/icons/`. Use these before adding new icon files.

Approved external icon source: Lucide icons from https://github.com/lucide-icons/lucide.git. New icons should match Lucide's simple stroke style unless the design system intentionally expands.

## Website Use

Every page should load:

```html
<link rel="stylesheet" href="design-system/colors_and_type.css" />
<link rel="stylesheet" href="design-system/portfolio.css" />
```

Then add only page-specific CSS after those imports.

## Recent System Updates
To ensure all future generations remain consistent, please note the following recent architectural and design updates:

1. **Component & Data Architecture:** Project cards (`components/project-card.jsx`) are now shared components strictly generated from `projects-data.js`. Card links utilize URL parameters (`case-study.html?project={id}`) for dynamic rendering.
2. **Typography & Hierarchy:** Removed "year" values from project cards and metadata blocks to maintain a timeless layout.
3. **Layout & Spacing Rules:** 
    - Capped section spacing to `48px` max per side (max `96px` combined), but `64px` is permitted for specific internal element spacing (like the hero CTA).
    - Standardized case-study rhythms: `48px` between text chapters, `32px` outside spacing for image rows, `16px` internal gap for galleries, and `16px` between chapter labels and body content.
4. **Media Handling:** 
    - Implemented three strict responsive ratios: `wide (16/9)`, `square (1/1)`, and `portrait (4/5)`. 
    - Added `heroFit: "contain"` and `heroPosition` configuration options in `projects-data.js` to handle wide mockups and manual focal points.
    - Gallery captions are hidden by default and toggleable via `showGalleryCaptions: true`.
5. **Navigation & Interactivity:** 
    - Home page filters are restricted to `All`, `UI/UX`, and `3D`. Display is limited to 3 cards by default with an "All projects / Show less" toggle.
    - Formalized the `.pk-link` (Text/Link) button role with its animated underline reveal, explicitly banning permanent solid bottom borders.
6. **Spacing grid enforcement (2026-06-07):**
    - Made the 4px step **mandatory** for `padding`/`margin`/`gap`; documented in the Spacing section.
    - Added `tools/check-spacing.py` (lint + `--fix`), a `PostToolUse` hook in `.claude/settings.json` that runs it on every CSS edit, and the `/design-check` skill for on-demand audits.
    - Cleaned 25 pre-existing off-grid values across all page CSS (`14→16`, `6→8`, `10→8`, `18→16`).
7. **CTA orange-margin rule (2026-06-07):**
    - The CTA (`.pk-btn`) orange background now keeps a min `24px` gap to the label and a min `24px` gap to the pill edge — `48px` horizontal padding + a `24px`-inset orange `::before` lozenge (hover, active, and touch states). Replaced the old `60%`-width / full-bleed-active model.
    - Button label-to-icon gap corrected `10px → 8px` (on-grid).
8. **Rule-change protocol (2026-06-07):**
    - Added a "Changing A Design Rule" section to `CLAUDE.md` and a `/rule-change` skill so rule edits propagate across CLAUDE.md + this README + CSS + linter, and are verified via grep + audit + this changelog.
9. **Canonical CTA width (2026-06-07):**
    - Made CTA width content-driven and defined once on `.pk-btn:not(.ghost)`: full-width on mobile, `fit-content` (min `280` / max `352px`) from `640px` up. Hero and footer CTAs now render the same width on every screen.
    - Removed competing per-page width overrides (`.hm-hero-cta`, `.pk-contact-cta-shell .pk-btn`) and the now-dead `--hm-button-max-desktop` / `--hm-cta-desktop-max` tokens. Previously the footer's selector out-specified the hero's, so the two diverged on desktop.
10. **Tag-meta text role + About skills (2026-06-07):**
    - Promoted the project-card tag style to a shared `.pk-tag-meta` role (uppercase, tracked, muted inline text; `.pk-project-card-tags` is now an instance).
    - About-page **skills** switched from `.pk-tag` chips to `.pk-tag-meta` inline text, pipe-separated, matching the project-card tag look (`AmSkillChips` → `AmSkills`).
11. **Responsive default project count (2026-06-07):**
    - Home shows 3 project cards by default, but **4 in the `900–1179.98px` 2-column range** so the grid fills two even rows instead of an uneven 2 + 1. Driven by a `matchMedia` query in `HmProjects`; columns and the `All projects` toggle behaviour are unchanged.
12. **Featured-project gallery images are links (2026-06-07):**
    - The four preview images in `HmFeaturedProject` are now `<a>` links to the project page (`project.href`) instead of non-interactive `role="img"` divs, with a `:focus-visible` ring. Consistent with "open a project by clicking its media."
13. **Local clean URLs + case-study top clearance (2026-06-07):**
    - Dev preview (`.claude/launch.json`) switched from `python -m http.server` to `npx serve` so clean URLs (e.g. `/case-study?project=beer-box`) resolve locally like production (via `serve.json`).
    - Case-study `.cs-toolbar` top padding raised so the "Projects" toolbar clears the floating header instead of overlapping it: `48px → 72px` below 900px (was a −2px overlap) and `80px → 96px` on desktop.
