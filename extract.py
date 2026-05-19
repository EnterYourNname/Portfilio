import os
import re

files = [
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\275\content.md",
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\276\content.md",
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\277\content.md",
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\278\content.md",
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\279\content.md",
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\280\content.md",
    r"C:\Users\andr\.gemini\antigravity\brain\850032f9-7ba6-4feb-beff-f2f7ba893129\.system_generated\steps\281\content.md",
]

output = []

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract Title
    title_match = re.search(r"Title: (.*)", content)
    title = title_match.group(1) if title_match else "Unknown Project"
    
    # Extract url
    url_match = re.search(r"Source: (.*)", content)
    url = url_match.group(1) if url_match else ""
    project_id = url.split('/')[-1] if url else "unknown"
    
    # Split content
    parts = content.split("Contact\n\n")
    if len(parts) > 1:
        body = parts[-1]
    else:
        body = content
        
    body = body.split("# DESIGNING WITH PURPOSE, ALWAYS")[0].strip()
    
    output.append(f"=========================================\n")
    output.append(f"PROJECT ID: {project_id}\n")
    output.append(f"PAGE TITLE: {title}\n")
    output.append(f"=========================================\n\n")
    output.append(body + "\n\n\n")

with open(r"e:\Figma\Website\Fig_File\project_data.txt", 'w', encoding='utf-8') as f:
    f.writelines(output)

print("Done extracting!")
