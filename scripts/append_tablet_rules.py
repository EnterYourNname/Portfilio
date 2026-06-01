import os

css_files = {
    'home/home.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .hm-section, .hm-hero-content {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
""",
    'about/about.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .am-intro, .am-section, .am-meta, .am-skills, .am-experience.paper {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  .am-now, .am-beyond-list, .am-portrait.inset {
    margin-left: 24px !important;
    margin-right: 24px !important;
  }
}
""",
    'contact/contact.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .ct-toolbar, .ct-hero, .ct-form, .ct-success {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
""",
    'case-study.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .cs-toolbar, .cs-hero, .cs-meta, .cs-section, .cs-next, .cs-image-row {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  .cs-image {
    margin-left: 24px !important;
    margin-right: 24px !important;
  }
}
""",
    'design-system/portfolio.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .pk-footer-bg, .pk-footer-black {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
"""
}

base_path = r"e:/Figma/Website/Fig_File/Claude Code/Contact"

for rel_path, content in css_files.items():
    file_path = os.path.join(base_path, rel_path)
    with open(file_path, 'a') as f:
        f.write(content)
    print(f"Appended tablet rules to {rel_path}")
