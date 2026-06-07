---
name: rule-change
description: Add or change a design-system rule without drift — propagates the change across CLAUDE.md, design-system/README.md, the CSS, and the linter, then verifies docs and code agree. Use whenever a design/spacing/button/type rule is being added, changed, or removed, or when asked to "update the rules" or "document this change".
---

# Change a design rule (no-drift protocol)

A rule lives in up to four places. If they disagree, the rule has drifted. This skill
keeps them in sync and proves it.

| Place | What to edit |
|---|---|
| `CLAUDE.md` | The contract — the section stating the rule (auto-read every session) |
| `design-system/README.md` | The spec — the matching table/section + the changelog |
| The CSS (`design-system/*.css`, page CSS) | The implementation |
| `tools/check-spacing.py` | Enforcement — only if the rule is mechanically checkable |

## Steps

1. **State the rule in one sentence.** Write the canonical wording first; reuse it verbatim
   in the code comment, CLAUDE.md, and README so they can't diverge.

2. **Change the CSS** to satisfy the rule. Add a short comment quoting the rule sentence.

3. **Update `CLAUDE.md`** — the section that states the rule (e.g. Buttons And Interaction,
   Layout Rules, Type Rules). Keep it terse; this is the contract.

4. **Update `design-system/README.md`** — the matching table/section (e.g. the Conversion
   CTA spec table, the Spacing table). Keep tables and prose consistent with CLAUDE.md.

5. **Update enforcement (only if checkable).** In `tools/check-spacing.py`:
   - new numeric grid / step → a constant;
   - a legit off-grid exception → add the exact value to `ALLOW_VALUES` with a one-line reason;
   - a new mechanical rule → a new check.
   Not every rule is checkable (e.g. "headings left-aligned") — those stay written-only.

6. **Record the change.** Append one dated line to `design-system/README.md` →
   **"Recent System Updates"**. This section is the ledger that answers "is everything
   documented?".

7. **Bump caches.** For each changed CSS file, increment its `?v=` query in every HTML file
   that loads it (dev preview + GitHub Pages cache aggressively). Find them with:
   ```
   grep -rno "<file>\.css?v=[0-9]*" *.html
   ```

8. **Verify (all three must pass):**
   - **Grep for the OLD value/wording** — zero stray hits proves nothing stale remains:
     ```
     grep -rn "<old-value-or-text>" --include=*.css --include=*.md --include=*.html .
     ```
   - **Audit:** `python tools/check-spacing.py --all` exits `0`.
   - **Preview:** load the affected pages on the `contact` server (port 5173) at 360 / 393px;
     confirm `document.documentElement.scrollWidth - clientWidth === 0` (no overflow).

## Definition of done

A rule change is complete only when: CLAUDE.md + README + CSS + linter agree, the grep for
the old value is clean, the audit passes, a changelog line exists, and the preview is verified.
