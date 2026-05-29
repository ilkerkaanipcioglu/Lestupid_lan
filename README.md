# LeStupid

LeStupid is a small human-first language for expressing thoughts, documents, interfaces, workflows, and AI instructions with the same plain structure.

The purpose of this repository is the language itself: its philosophy, grammar, behavior, and examples. Tools are secondary and live under `tools/` so they never define the language.

## Start Here

Read [lestupid.md](lestupid.md) for the complete language guide.

That file is intentionally self-contained. A person should be able to write LeStupid by intuition, and an AI agent should be able to understand the language by reading that one file.

## Core Idea

LeStupid does not force a single natural language.

If a document is written in English, it may use English words:

```lestupid
section(dark):
  # Build Clearly
  Write the idea once. Keep the structure obvious.
  [Start !button](/start)
:section
```

If a document is written in Turkish, it may use Turkish words:

```lestupid
bolum(koyu):
  # Açıkça Kur
  Fikri bir kez yaz. Yapıyı anlaşılır tut.
  [Başla !buton](/basla)
:bolum
```

Both are valid. The writer chooses the natural language; LeStupid keeps the structure readable.

## Repository Layout

```text
lestupid.md              canonical language guide for humans and AI agents
README.md                project orientation
tools/html-renderer/     optional experimental HTML renderer
```

## Design Principles

1. Human-first: a readable note should already be close to valid LeStupid.
2. AI-readable: the structure should be low-noise and easy for a model to transform.
3. Language-flexible: English and Turkish names can describe the same structural ideas.
4. Small grammar: indentation, blocks, metadata, and simple inline marks carry most meaning.
5. Tool-independent: renderers, editors, and compilers are implementations, not the source of truth.

## Tools

Tools are optional. The current experimental tool is a dependency-free HTML renderer:

```bash
cd tools/html-renderer
npm test
npm run build:example
```

The tool is useful for testing examples, but the language definition remains [lestupid.md](lestupid.md).
