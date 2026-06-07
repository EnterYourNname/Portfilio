---
name: design-check
description: Audit the portfolio for design-system drift — runs the 4px spacing-grid linter across all CSS and reports off-grid padding/margin/gap values. Use when asked to check/audit the design system, verify spacing compliance, or before finishing a batch of CSS edits.
---

# Design-system audit

This project enforces a **4px spacing grid** (see `design-system/README.md` → Spacing
and `CLAUDE.md`). Spacing values — `padding`, `margin`, `gap` — must be multiples of 4px.
A `PostToolUse` hook already checks each edited CSS file automatically; this skill is the
**on-demand, whole-project** audit and fixer.

## Steps

1. **Run the full audit:**
   ```
   python tools/check-spacing.py --all
   ```
   - Exit `0` = clean, nothing to do.
   - Exit `2` = violations printed to stderr as `path:line  prop: value  -> use Npx`.

2. **Fix each violation** by rounding to the suggested nearest 4px step (or, better, swap
   to a `--space-*` token from `colors_and_type.css` where one fits). Prefer the 8px
   rhythm (`8, 16, 24, 32, 40, 48`); use `4` / `12` only for tight internal rhythm.

3. **Re-run** `python tools/check-spacing.py --all` until it exits `0`.

4. **Bump cache versions** for any CSS you changed: increment the `?v=` query on its
   `<link>`/`<script>` tags in the affected HTML files (dev preview + GitHub Pages
   cache aggressively).

5. **Verify visually** in the preview server (`contact`, port 5173) that the rounding
   didn't cause wrapping or overflow on mobile (360 / 393px) — this project must stay
   `docOverflow: 0`.

## Scope & intentional exceptions

The linter checks **layout rhythm only** (`padding` / `margin` / `gap`). It deliberately
does NOT flag:

- **Positioning offsets** (`top`/`right`/`bottom`/`left`/`inset`) — used for non-rhythm
  tricks: sr-only `left:-9999px`, `-1px` border overlaps, the `.pk-link` `-2px` underline.
- **Sub-4px hairlines** (`1`–`3px`) — optical nudges and hairline borders.
- **Non-spacing props** — `font-size`, `border-*`, `border-radius`, `width`, `height`,
  `outline`, `box-shadow`, etc.
- Values inside `calc()` / `clamp()` / `min()` / `max()` / `var()` — responsive or
  already-tokenised.

If a genuine off-grid spacing exception is ever needed, add the exact value to
`ALLOW_VALUES` in `tools/check-spacing.py` with a one-line justification — don't loosen
the grid rule globally.

## The contract (quick reference)

- Source of truth: `design-system/colors_and_type.css` (tokens) + `design-system/portfolio.css` (components).
- Spacing steps: `4, 8, 12, 16, 24, 32, 40, 48, 64px`; 16px page gutters; section gap ≤ 48px/side (96px combined).
- Full rules: `CLAUDE.md` and `design-system/README.md`.
