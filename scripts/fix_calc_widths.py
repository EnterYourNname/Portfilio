import os

css_files = {
    'about/about.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .am-portrait.inset, .am-rule-orange {
    width: calc(100% - 48px) !important;
  }
}
""",
    'case-study.css': """
@media (min-width: 640px) and (max-width: 899px) {
  .cs-hero-img {
    margin-left: 24px !important;
    margin-right: 24px !important;
    width: calc(100% - 48px) !important;
  }
}
"""
}

base_path = r"e:/Figma/Website/Fig_File/Claude Code/Contact"

for rel_path, content in css_files.items():
    file_path = os.path.join(base_path, rel_path)
    with open(file_path, 'a') as f:
        f.write(content)
    print(f"Appended width fixes to {rel_path}")
