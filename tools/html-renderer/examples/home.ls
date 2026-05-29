===
title: LeStupid Demo
description: A tiny language for humans to write and AI to understand.
language: en
===

section(dark):
  # LeStupid
  Write like a human.
  Structure just enough.
  Let AI understand the rest.
:section

section:
  ## One simple idea
  Markdown can write text.
  HTML5 can describe pages.
  Pseudocode can explain logic.
  LeStupid keeps all three simple enough for a person to write without fear.
:section

grid(3):
  card:
    # Text
    # A note
    *Important* words, _quiet_ details, `exact` names.
    - one idea
    - another idea
  :card

  card:
    # Page
    section:
      # Product Card
      A small page block.
      [Start !button](#)
    :section
  :card

  card:
    # Intent
    prompt:
      goal: turn this note into a clean page
      keep: simple language
      output: HTML5
    :prompt
  :card
:grid

section(gray):
  ## HTML5, but easier to write
  The human writes the meaning. A renderer can create HTML5.
  code(lestupid):
    section:
      # Welcome
      Explain the product in one sentence.
      [Start !button](#)
    :section

    grid(2):
      card:
        # Fast
        Short blocks are easy to scan.
      :card
      card:
        # Clear
        Indentation shows hierarchy.
      :card
    :grid
  :code
:section

section:
  ## Code intent, simpler than pseudocode
  You can write step by step.
  You can also say what should happen.
  AI can turn the intent into Elixir, Rust, Python, or another target.
:section

grid(2):
  card:
    # Step by step
    code(intent):
      task: summarize notes
      steps:
        - remove empty notes
        - keep the original language
        - join the main ideas
        - return a short summary
    :code
  :card

  card:
    # With target
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
:grid

section(dark):
  # The rule
  If a human can read it, AI should understand it.
  If AI needs more detail, add one clear line.
  No ceremony. No hidden magic.
:section
