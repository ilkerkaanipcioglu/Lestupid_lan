# LeStupid Language Guide

This is the canonical guide for LeStupid.

It is written so a human can learn the language quickly and an AI agent can read this one file to understand how to parse, write, explain, and transform LeStupid documents.

## 1. Purpose

LeStupid is a human-first structured language.

It can describe:

- Notes and documents
- Web pages and UI layouts
- Forms and content cards
- Data-like records
- Workflow steps
- AI instructions and prompts
- Code-shaped logic when needed

LeStupid is not tied to one renderer, editor, framework, or programming language. A tool may convert LeStupid to HTML, React, Markdown, JSON, SQL, Python, Elixir, Rust, or another target, but the language itself remains independent.

LeStupid should stay simpler than Markdown and HTML5. Markdown is useful text syntax. HTML5 is useful output structure. LeStupid sits before both: it captures human intent in a form an AI can understand and a person can still write without fear.

## Required Element Core

A LeStupid implementation should start with this small element set.

| Element | Purpose | Example |
| --- | --- | --- |
| `metadata` | Describe the whole file | `title`, `description`, `language` |
| `text` | Plain readable content | paragraph, `# heading`, quote, list |
| `link` | Navigation | `[Read](/docs)` |
| `button` | Clear action | `[Start !button](/start)` |
| `section` | Page or document area | `section:` |
| `grid` | Repeated layout | `grid(2):` |
| `card` | One grouped item | `card:` |
| `form` | User input | `form:` |
| `field` | One input line | `name | text | Name` |
| `media` | Image, video, audio | `image: /cover.jpg` |
| `data` | Structured facts | `data:` |
| `workflow` | Ordered process | `workflow:` |
| `prompt` | AI instruction | `prompt:` |
| `code(target)` | Explain code intent to AI | `code(rust-ai):` |

These elements are enough for the first useful language surface. More elements can exist later, but they should not make basic writing harder.

### Markdown Coverage Rule

LeStupid should cover the familiar Markdown surface with simpler, self-explaining forms.

| Markdown idea | LeStupid form |
| --- | --- |
| Heading | `# Main idea` |
| Bold | `*important*` |
| Italic | `_quiet detail_` |
| Quote | `> quoted thought` |
| Ordered list | `1. first` |
| Unordered list | `- item` |
| Task list | `- [x] done`, `- [ ] next` |
| Inline code | `` `exact name` `` |
| Code block | `code(target): ... :code` |
| Horizontal rule | `---` |
| Link | `[Read](#)` |
| Image | `image: /cover.jpg` |
| Table-like fields | `field: name | text | Name` |
| Footnote-like note | `note: explanation` |
| Heading id | `id: clear-section` before a heading |
| Definition | `LeStupid: simple structure for humans and AI` |
| Strikethrough | `~old idea~` |
| Highlight | `==important idea==` |
| Subscript | `H sub(2) O` |
| Superscript | `X^2^` |
| Emoji intent | `emotion: joy` or `:joy:` |

The rule is not to copy Markdown exactly. The rule is to keep the author's intent obvious and make the AI transformation easy.

### HTML5 and Pseudocode Rule

LeStupid should express HTML5 concepts without forcing the author to write HTML tags.

```lestupid
section:
  # Welcome
  Explain the product in one sentence.
  [Start !button](#)
:section
```

A renderer may turn that into HTML5. The human does not need to write `<section>`, `<h1>`, `<p>`, and `<a>` unless they explicitly want to.

LeStupid should also express code intent more naturally than traditional pseudocode. The author may write steps:

```lestupid
code(intent):
  task: summarize notes
  steps:
    - remove empty notes
    - keep the original language
    - join the main ideas
    - return a short summary
:code
```

Or the author may simply describe what should happen:

```lestupid
code(intent):
  do: summarize the notes
  keep: original language
  avoid: empty notes
:code
```

An AI agent should treat both forms as implementation intent. If `target` is present, use that target language. If `target` is missing, ask or choose based on context.

### Target Rule for Code Intent

When a `code` block explains programming intent, `target` decides whether the output language is fixed.

If `target` is missing, the AI may choose an implementation language such as Python, C++, Elixir, Rust, or another suitable target.

If `target` is present, the language is explicit:

```lestupid
code:
  target: Elixir
  module: Notes
  function: summarize(notes)
  input: list of strings
  output: short string
  rules:
    - ignore empty notes
    - keep the input language
    - return "No notes" when empty
:code
```

Here the AI should generate or explain Elixir, not Python or C++.

## 2. Philosophy

LeStupid begins with one belief:

People should shape tools with natural thought; tools should not force people to think like machines.

The language should feel like structured writing, not like ceremony. A valid LeStupid file should look close to a clear note, a product sketch, a page outline, or an instruction to an assistant.

The name is playful. The goal is not stupidity; the goal is obviousness. Clever syntax is avoided when plain structure is enough.

## 3. Natural Language Rule

LeStupid does not force English, Turkish, or any single natural language.

The author may write in the language of the document:

- English documents may use names like `section`, `card`, `button`, `title`.
- Turkish documents may use names like `bolum`, `bölüm`, `kart`, `buton`, `başlık`.
- Mixed documents are allowed when useful.

Tools should normalize known aliases to the same structural meaning.

Example:

```lestupid
section(dark):
  # Clear Work
  Write plainly.
:section
```

```lestupid
bolum(koyu):
  # Açık İş
  Sade yaz.
:bolum
```

Both mean the same kind of structure.

## 4. Core Syntax

LeStupid has five core rules.

1. `name: value` creates a simple value.
2. Indentation creates hierarchy.
3. `block:` opens a block.
4. `:block` closes a block.
5. Plain text remains plain text unless it uses a known mark.

Example:

```lestupid
title: My Page
language: en

section:
  # Hello
  This is a paragraph.
:section
```

## 5. Front Matter

Front matter describes the whole document.

It starts with `===` and ends with `===`.

```lestupid
===
title: Product Notes
description: Early ideas for the first release
language: en
theme: clean
===
```

Common metadata names:

| Meaning | English | Turkish |
| --- | --- | --- |
| Title | `title` | `başlık`, `baslik` |
| Description | `description` | `açıklama`, `aciklama` |
| Language | `language` | `dil` |
| Theme | `theme` | `tema` |
| Author | `author` | `yazar` |

Tools should preserve unknown metadata keys.

## 6. Blocks

A block is a named container.

```lestupid
section:
  # Heading
  Body text.
:section
```

Blocks may include options in parentheses.

```lestupid
section(dark full):
  # Hero
:section
```

Options may also be written in Turkish.

```lestupid
bolum(koyu tam-ekran):
  # Karşılama
:bolum
```

Common structural aliases:

| Meaning | English | Turkish |
| --- | --- | --- |
| Section | `section` | `bolum`, `bölüm` |
| Grid | `grid` | `izgara` |
| Card | `card` | `kart` |
| Form | `form` | `form` |
| Field | `field` | `alan` |
| List | `list` | `liste` |
| Item | `item` | `madde` |
| Data | `data` | `veri` |
| Step | `step` | `adım`, `adim` |
| Task | `task` | `görev`, `gorev` |
| Prompt | `prompt` | `komut`, `istem` |

Common option aliases:

| Meaning | English | Turkish |
| --- | --- | --- |
| Dark | `dark` | `koyu` |
| Light | `light` | `acik`, `açık` |
| Gray | `gray`, `grey` | `gri` |
| Full screen | `full`, `full-screen` | `tam-ekran` |
| Primary | `primary` | `birincil` |
| Secondary | `secondary` | `ikincil` |
| Button | `button` | `buton` |

## 7. Text Markup

LeStupid uses familiar lightweight marks.

```lestupid
# Heading 1
## Heading 2
### Heading 3

Plain paragraph text.

*bold*
_italic_
~deleted~
`inline code`

[Link text](/url)
[Button text !button](/url)
[Buton metni !buton](/url)
![Image alt](/image.jpg)

> Quote text
---
```

Lists:

```lestupid
- item
- item
  - nested item

1. first
2. second
```

Tables:

```lestupid
| Name | Age | City |
| Ada  | 32  | Ankara |
```

## 8. UI Structures

LeStupid can describe interface structure without requiring a UI framework.

```lestupid
grid(3):
  card:
    # Notes
    Capture thoughts with structure.
    [Open !button](/notes)
  :card

  card:
    # Pages
    Turn outlines into pages.
    [Open !button](/pages)
  :card
:grid
```

Turkish version:

```lestupid
izgara(3):
  kart:
    # Notlar
    Fikirleri yapılı şekilde tut.
    [Aç !buton](/notlar)
  :kart
:izgara
```

Forms:

```lestupid
form:
  name    | text     | Name
  email   | email    | Email
  message | textarea | Message
  ---
  Send
:form
```

Turkish form:

```lestupid
form:
  ad     | metin | Adınız
  email  | email | E-posta
  mesaj  | alan  | Mesajınız
  ---
  Gönder
:form
```

## 9. Data Structures

Data can be written as simple values or nested records.

```lestupid
person:
  name: Ada
  role: Designer
  active: true
:person
```

Turkish:

```lestupid
kisi:
  ad: Ada
  rol: Tasarımcı
  aktif: doğru
:kisi
```

Tools should preserve original keys unless a target format requires normalization.

## 10. Workflow Structures

LeStupid can describe processes for humans or agents.

```lestupid
workflow:
  step: Read the request
  step: Identify the output
  step: Produce the smallest useful result
  step: Verify before finishing
:workflow
```

Turkish:

```lestupid
akis:
  adim: İsteği oku
  adim: Çıktıyı belirle
  adim: En küçük faydalı sonucu üret
  adim: Bitirmeden doğrula
:akis
```

## 11. AI Instructions

An AI-facing LeStupid file should be direct and structured.

```lestupid
prompt:
  role: You are a careful product assistant.
  goal: Turn notes into a clean feature brief.
  input:
    - User notes
    - Existing constraints
  output:
    format: Markdown
    include:
      - Summary
      - Requirements
      - Open questions
:prompt
```

Turkish:

```lestupid
istem:
  rol: Dikkatli bir ürün asistanısın.
  amaç: Notları temiz bir özellik özetine çevir.
  çıktı:
    biçim: Markdown
    dahil:
      - Özet
      - Gereksinimler
      - Açık sorular
:istem
```

An AI agent reading LeStupid should:

1. Preserve the writer's natural language.
2. Infer structure from blocks, indentation, and labels.
3. Normalize known aliases only internally.
4. Avoid inventing hidden behavior.
5. Ask for clarification only when the target output is ambiguous.

## 12. Logic Layer

LeStupid may express code-shaped intent, but it should remain readable.

```lestupid
name = "Ada"
age = 32
active = true

function greet(name):
  return "Hello " + name

if age > 18:
  print "Adult"
else:
  print "Child"
```

Turkish:

```lestupid
ad = "Ada"
yas = 32
aktif = doğru

fonk selamla(ad):
  döndür "Merhaba " + ad

eğer yas > 18:
  yazdır "Yetişkin"
değilse:
  yazdır "Çocuk"
```

The logic layer is descriptive first. A compiler may later map it to a real programming language.

## 13. Error Philosophy

Errors should be written for the document author.

Good error:

```text
The block "section" was opened but not closed. Add ":section".
```

Turkish document error:

```text
"bolum" bloğu açıldı ama kapanmadı. ":bolum" ekleyin.
```

Bad error:

```text
Unexpected token at ASTNode:14
```

## 14. Complete Example

```lestupid
===
title: LeStupid Demo
description: A page written as structured thought
language: en
theme: clean
===

section(dark):
  # LeStupid
  Simple writing. Clear structure. Useful output.
  [Start !button](/start)
:section

grid(3):
  card:
    # Notes
    Write ideas as they arrive.
  :card

  card:
    # Interfaces
    Sketch screens with readable blocks.
  :card

  card:
    # AI
    Give agents low-noise instructions.
  :card
:grid

prompt:
  role: You are an assistant that understands LeStupid.
  task: Convert this document into clean HTML.
  preserve_language: true
:prompt
```

Turkish:

```lestupid
===
başlık: LeStupid Demo
açıklama: Yapılı düşünceyle yazılmış bir sayfa
dil: tr
tema: temiz
===

bolum(koyu):
  # LeStupid
  Sade yazı. Açık yapı. Faydalı çıktı.
  [Başla !buton](/basla)
:bolum

izgara(3):
  kart:
    # Notlar
    Fikirleri geldiği gibi yaz.
  :kart

  kart:
    # Arayüzler
    Ekranları okunabilir bloklarla tasarla.
  :kart

  kart:
    # AI
    Ajanlara düşük gürültülü talimat ver.
  :kart
:izgara

istem:
  rol: LeStupid anlayan bir asistansın.
  görev: Bu belgeyi temiz HTML'e çevir.
  dili_koru: doğru
:istem
```

## 15. Implementation Rule

If a tool implements LeStupid, it should treat this file as the source of truth.

Tools may be incomplete. The language guide is allowed to be ahead of the tools.
