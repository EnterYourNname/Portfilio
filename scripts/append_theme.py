import os

css_content = """
/* --- Auto Theme Colors --- */
:root {
  --theme-btn-bg: var(--ink);
  --theme-btn-text: var(--cream);
}

.pk-footer-black, .hm-hero, .surface-dark, .am-experience.paper {
  --theme-btn-bg: var(--cream);
  --theme-btn-text: var(--ink);
}

.pk-header {
  transition: color 240ms var(--ease-out);
  color: var(--cream); /* fallback */
}
.pk-header.theme-light-bg {
  color: var(--ink);
}
.pk-header.theme-dark-bg {
  color: var(--cream);
}
/* Ensure the hamburger button border looks right on light bg */
.pk-header.theme-light-bg .pk-menu-btn {
  background: rgba(255, 245, 232, 0.72);
  border-color: rgba(27, 24, 20, 0.16);
}
"""

with open('e:/Figma/Website/Fig_File/Claude Code/Contact/design-system/portfolio.css', 'a') as f:
    f.write(css_content)
