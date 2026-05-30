# Implementation Plan - LeStupid 2.0 (Zero-Syntax & AI-Native)

Evolving LeStupid from a lightweight markup language to a **Zero-Syntax, AI-Native Specification**. The core philosophy is that a human should be able to write completely intuitively (without knowing Markdown, HTML5, TXT formatting, or programming syntaxes), and an AI model can parse and render/compile the intent perfectly (knowing whether it is a table, form, layout, or code logic).

## Proposed Changes

### Spec & Documentation
- `[NEW] specs/lestupid-2.0-spec.md` (Completed)
- `[MODIFY] README.md` (Completed)
- `[MODIFY] lestupid.md` (Completed)

### Core Parser Update
- `[MODIFY] tools/html-renderer/src/lestupid.js`:
  Upgrade the parser logic to:
  1. Support indent-based block closing (no more mandatory `:section`, `:card`, `:grid`, `:code` lines needed, though they remain supported for backwards compatibility).
  2. Parse natural section headers (e.g. `Koyu Bölüm:`, `Gri Bölüm:`, `Bölüm:`, `Dark Section:`).
  3. Parse natural grid layouts (e.g. `Kutular (3 Kolon):`, `Izgara (2 Kolon):`, `Grid (3 columns):`).
  4. Parse natural card blocks (e.g. `Kart:`, `Card:`).
  5. Parse natural buttons and action links (e.g. `Buton: "Start" -> #`, `Link: "Google" -> https://google.com`).
  6. Support CSV/pipe/space-separated table automatic detection and parsing.

---

## Verification Plan

### Manual Verification
- We will test the updated parser by loading the zero-syntax example files (`landing-page.ls`, `dashboard-data.ls`, `feedback-form.ls`) and rendering them to HTML.
- We will run the local Node server and check that the web editor renders LeStupid 2.0 code correctly.
