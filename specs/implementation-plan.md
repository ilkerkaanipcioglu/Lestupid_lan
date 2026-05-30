# Implementation Plan - Repository Refactoring & Bug Fixes

Resolving critical bugs, architectural inconsistencies, and usability issues identified during the repository review of LeStupid.

## Proposed Changes

### Core Parser (`tools/html-renderer/src/lestupid.js`)
- **[MODIFY] [lestupid.js](file:///B:/DEV/HAREZM_EKOSISTEMI/LesTupid_Lan/tools/html-renderer/src/lestupid.js)**:
  1. Fix the Tab Indentation Bug: Update `getIndent` to treat `\t` as 2 spaces (replacing it with `  `).
  2. Fix Aggressive Colons: Refine the definition list regex to limit it to short terms (maximum 25 characters of letters/numbers/spaces/hyphens) to avoid mangling normal sentences with colons.

### Web Editor (`tools/html-renderer/src/web/editor.js`)
- **[MODIFY] [editor.js](file:///B:/DEV/HAREZM_EKOSISTEMI/LesTupid_Lan/tools/html-renderer/src/web/editor.js)**:
  1. Fix Trapped Iframe Links: Allow local link navigation within the iframe preview. For external links (`http://` or `https://`), open them in a new tab (`_blank`) instead of fully locking them.

### Documentation & Git Setup
- **[MODIFY] [README.md](file:///B:/DEV/HAREZM_EKOSISTEMI/LesTupid_Lan/tools/html-renderer/README.md)**:
  - Fix the broken case-sensitive relative link pointing to `LESTUPID.md` (rename to lowercase `lestupid.md`).
- **[NEW] [.gitignore](file:///B:/DEV/HAREZM_EKOSISTEMI/LesTupid_Lan/.gitignore)**:
  - Add a root-level `.gitignore` file to prevent committing `node_modules`, system files, and compiled HTML artifacts.

---

## Verification Plan

### Automated & Manual Verification
1. Run the Node test suite (`npm test`) to ensure everything passes.
2. Verify that tab characters in `.ls` source files are parsed exactly like 2-space indents.
3. Test that sentences containing colons (e.g. `Note: this is a sentence`) are rendered as normal paragraphs rather than `<dl>` blocks.
4. Open the editor in the browser at `http://127.0.0.1:4174/` and verify that link clicks in the preview navigate locally or open in a new tab successfully.
