# Portfolio Design System

This design system translates the Figma `V02` mobile portfolio width into reusable local website rules, tokens, styles, and assets.

## Source

- Figma file: https://www.figma.com/design/as1HwwRAJ9aksu6yWCLvFl/FigmaMCP?node-id=166-1382
- Primary node: `166:1382`
- Canvas width: 393 px mobile reference; height must fit the live content, not a fixed Figma frame number
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

### Spacing

Use the 4 px grid. Common values are 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, and 96 px.

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
| Button/icon gap | `8px` |
| Button groups/chip rows | `8px` to `12px` |
| Project card media to title/meta | `16px` |
| Project card to project card | `32px` |
| List rows, skills, experience rows | `12px` to `16px` internal rhythm |
| Touch target visual minimum | Primary: `48px`; Secondary: `40px` visual with `48px` tap area; Tertiary: `32px` visual with expanded tap area |
| Adjacent touch targets | At least `8px` visual separation where possible |

Spacing should feel editorial and compact, not like a generic marketing landing page. Avoid oversized `120px+` vertical gaps on mobile.

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

### Primary Button

Use `.pk-btn` for the main CTA. Label copy should usually be `Let's create`. The arrow should use a local Lucide-style arrow icon or the existing inline arrow pattern.

Figma source: `Button` component set, node `169:2128`, `Property 1=Primary`.

Base settings:

| Property | Value |
|---|---|
| Default component size | `361px x 48px` |
| Height | `48px` |
| Radius | `99px` |
| Padding | `12px 24px` |
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
| Default | `#1B1814` / `--ink` | Cream label `#FFF6E8`, orange arrow `#FF6B4A` | Flat pill |
| Hover | `#1B1814` with centered orange/yellow layer from Figma (`#FFCB3C`) | Ink label and arrow | Center expansion from the button middle; may add `translateY(-2px) scale(1.012)` plus soft pop shadow |
| Active | Full orange `#FF8A36` with layered Figma fills | Ink label and arrow | Pressed scale around `0.985`; Figma inner frame is about `335.35px x 45.6px` |
| Focus | Same as current state | Same as current state | 2 px orange outline, 3 px offset |
| Disabled | `#BCBCBC` / `--color-gray-500` | Disabled cream label `#E3DFDA`, arrow muted or hidden | No motion or shadow |

Do not create a second primary style. If a page needs the main CTA, use `.pk-btn` and inherit this state model.

Button animation rule: only the Primary button may use the centered orange expansion animation. Secondary and Tertiary buttons may change fill, border, shadow, or scale, but they must not use an orange pseudo-element expanding from the center.

### Secondary Button

Use the secondary button for supporting actions such as `View all projects`, `More about me`, or a non-primary navigation choice. It should remain quieter than the primary CTA while still separating clearly from the paper background.

Figma source: `Button` component set, `Property 1=Secondary`.

Base settings:

| Property | Value |
|---|---|
| Height | `40px` |
| Radius | `99px` |
| Padding | `12px 24px` |
| Gap | `8px` between label and icon |
| Font | `BDO Grotesk DemiBold` |
| Font size | `14px` |
| Font weight | `600` |
| Line height | `140%` |
| Letter spacing | `0.16px` |
| Icon | Lucide arrow-right, `16px`, orange stroke |

Secondary button states:

| State | Background | Border | Text/icon | Motion |
|---|---|---|---|---|
| Default | `--color-cream-50` | `1px solid --ink` | Ink label, orange arrow | Flat pill |
| Hover | `--color-cream-200` | `1px solid --ink` | Ink label, orange arrow | `translateY(-1px)` with a soft ink shadow |
| Active | `--ink` | `1px solid --ink` | Cream label, orange arrow | `scale(0.95)` |
| Selected | `--ink` | `1px solid --ink` | Cream label, orange arrow | `scale(1.0)`; stays selected until clicked again |
| Disabled | `--color-gray-500` | None | `--color-cream-700` label, orange arrow muted or hidden | No motion |

Selected is a persistent toggle state: clicking a secondary button selects it, and clicking the same selected button again returns it to default. Do not use active press scaling for the selected resting state.

The secondary style is currently being previewed in `secondary-button-preview.html`; do not promote it into shared CSS until a final option is chosen.

### Tertiary Button

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

- Use this role **only** for hyperlinks and text-only buttons. If the action needs more visual weight, use Primary, Secondary, or Tertiary instead.
- Never reach for `text-decoration: underline` on a hyperlink — let `.pk-link` carry the animated underline.
- Never give text links a permanent solid border-bottom; the animated reveal is the role.
- The role borrows the Button-M typography tokens (`--type-size-button-secondary`, `--type-weight-button-secondary`). This is the single typography style used for hyperlinks across the site.

### Segmented Control

Use `.pk-seg` for project filters. The track is cream-gray, inactive options are white pills, and the active option is ink with cream text.

### Project Card

Use `.pk-card`, `.pk-tags`, and `.pk-tag`. Media uses a 4 px radius. Tags are pill outlines. Titles are direct and sentence case.

Each project card must behave as a link to its project detail or case-study page. Project navigation belongs on the cards, not in the main website navigation.

### Experience

Use a dark ink section with cream text and orange dividers. Dates are secondary and right-aligned when space allows.

### Skills

Use large regular-weight skill labels with small two-digit counters. Rows have ink dividers and orange counters when matching the Figma frame.

### Manifesto Footer

Use `manifesto-bg.jpg`, dark overlays, the manifesto line `Designing with purpose, always.`, email contact, social links, and compact footer navigation.

## Assets

Primary local assets:

- `assets/avatar.jpg`
- `assets/hero-portrait.png`
- `assets/work-reel.png`
- `assets/project-kuckoo.png`
- `assets/manifesto-bg.jpg`
- `assets/kuckoo-interior-night.jpg`
- `assets/kuckoo-interior-day.jpg`
- `assets/kuckoo-exterior.jpg`

Icons live in `assets/icons/`. Use these before adding new icon files.

Approved external icon source: Lucide icons from https://github.com/lucide-icons/lucide.git. New icons should match Lucide's simple stroke style unless the design system intentionally expands.

## Website Use

Every page should load:

```html
<link rel="stylesheet" href="design-system/colors_and_type.css" />
<link rel="stylesheet" href="design-system/portfolio.css" />
```

Then add only page-specific CSS after those imports.
