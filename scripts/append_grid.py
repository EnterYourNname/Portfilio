import os

css_content = """
/* --- Tablet & Desktop 2-Column Grid for Intro/Portrait/Lead/Meta --- */
.am-fade-grid {
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) {
  .am-fade-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: 
      "intro intro intro intro intro intro intro intro intro intro intro intro"
      "text text text text text text photo photo photo photo photo photo"
      "meta meta meta meta meta meta photo photo photo photo photo photo";
    gap: 32px;
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .am-fade-grid > .am-intro,
  .am-fade-grid > .am-lead-section,
  .am-fade-grid > .am-meta {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    max-width: none !important;
  }
  
  .am-fade-grid .am-portrait.inset {
    grid-area: photo;
    width: 100% !important;
    max-width: 100% !important;
    margin: 32px 0 0 0 !important;
  }
  
  .am-fade-grid .am-intro { grid-area: intro; }
  .am-fade-grid .am-lead-section { grid-area: text; padding-right: 24px !important; }
  .am-fade-grid .am-meta { grid-area: meta; padding-right: 24px !important; }
}

@media (min-width: 900px) {
  .am-fade-grid {
    padding-left: var(--am-grid-gutter);
    padding-right: var(--am-grid-gutter);
    max-width: var(--am-grid-max);
    margin: 0 auto;
    gap: 48px;
  }
}
"""

with open('e:/Figma/Website/Fig_File/Claude Code/Contact/about/about.css', 'a') as f:
    f.write(css_content)
