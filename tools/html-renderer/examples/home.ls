===
title: LeStupid Demo
description: A tiny intuitive language for humans and AI agents.
language: en
===

section(dark):
  # LeStupid
  Simpler than Markdown. Easier than HTML5.
  Write what you mean. AI understands the shape.
:section

section:
  ## One idea, three readers
  Human reads: a clear note.
  Browser receives: clean output.
  AI reads: intent, target, rules, and structure.
  > The writer should not fight syntax. The tool should understand the writer.
:section

grid(3):
  card:
    # Human
    Plain words first.
    Short blocks.
    No ceremony.
  :card

  card:
    # AI
    Labels explain intent.
    Indentation explains hierarchy.
    Rules explain behavior.
  :card

  card:
    # Output
    Render to HTML5.
    Explain Elixir.
    Explain Rust.
  :card
:grid

section(gray):
  ## Required elements
  This is the small core. A person can write it by feeling. An AI can map it safely.
  code(lestupid-elements):
    document:
      === metadata ===
      title, description, language, theme

    text:
      # heading
      plain paragraph
      *bold* _italic_ `code`
      [link](/path)
      [button !button](/path)
      > quote
      - list item

    layout:
      section:
      grid(2):
      card:

    input:
      form:
      field: name | text | Label

    media:
      image: /image.jpg
      video: /video.mp4
      audio: /audio.mp3

    meaning:
      data:
      workflow:
      prompt:
      code(target):
  :code
:section

grid(2):
  card:
    # Tiny page
    This describes a page without making the human write HTML tags.
    code(lestupid):
      section:
        # Clear Page
        This becomes HTML5.
        [Start !button](/start)
      :section

      grid(2):
        card:
          # First
          Simple content.
        :card
      :grid
    :code
  :card

  card:
    # HTML5 output idea
    The renderer may produce HTML5, but the author writes LeStupid.
    code(html5):
      <main>
        <section>
          <h1>Clear Page</h1>
          <p>This becomes HTML5.</p>
          <a class="button" href="/start">Start</a>
        </section>
      </main>
    :code
  :card
:grid

section:
  ## AI-readable code intent
  LeStupid does not need to be Elixir or Rust.
  It only needs to explain the job so an AI can generate Elixir or Rust correctly.
  If `target` is missing, the AI may choose Python, C++, or another language.
  If `target: Elixir` exists, the language is clear.
:section

grid(2):
  card:
    # Target is explicit
    code(elixir-ai):
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
  :card

  card:
    # Target can change
    code(rust-ai):
      target: Rust
      struct: Note
      fields:
        title: String
        body: String
      function: word_count(note)
      output: usize
      rules:
        - count title and body
        - split by whitespace
        - do not mutate input
    :code
  :card
:grid

section(gray):
  ## Without target
  This is still useful, but the output language is not fixed.
  code(ai-intent):
    function: summarize(notes)
    input: list of strings
    output: short string
    rules:
      - ignore empty notes
      - keep the input language
      - return "No notes" when empty
  :code
:section

bolum(koyu):
  # Turkce de ayni
  Insan kendi dilinde yazar. AI yapıyı anlar.
  Markdown kadar sezgisel, HTML5 kadar faydalı, ama daha az hata yaptırır.
:bolum
