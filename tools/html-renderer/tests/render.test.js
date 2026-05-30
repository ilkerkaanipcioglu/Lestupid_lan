const assert = require("assert");
const { render } = require("../src/lestupid");

// Test LeStupid 1.0 (Backwards Compatibility)
const output1_0 = render(`
===
başlık: Deneme
dil: tr
===

bolum(koyu):
  # Merhaba
  [Keşfet !buton](/kesfet)
:bolum

section(dark):
  # Hello
  [Explore !button](/explore)
:section

bölüm(gri):
  # Renk
:bölüm

code(rust):
  fn main() {
    println!("hello");
  }
:code

FLOW: login check
  START
  -> get credentials
  -> validate
:code

o Review @todo
x Done item
See [[Flow Intent]]
tag: simple
ref: Parser Contract
quote: Keep syntax small.

Shopping:
  list:
    - apple
    - tomato

md:
  # Markdown island

elixir:
  defmodule Notes do
  end
`);

assert.match(output1_0, /<html lang="tr">/);
assert.match(output1_0, /<title>Deneme<\/title>/);
assert.match(output1_0, /<section class="ls-section is-dark">/);
assert.match(output1_0, /<h1>Merhaba<\/h1>/);
assert.match(output1_0, /<a href="\/kesfet" class="ls-button">Keşfet<\/a>/);
assert.match(output1_0, /<h1>Hello<\/h1>/);
assert.match(output1_0, /<a href="\/explore" class="ls-button">Explore<\/a>/);
assert.match(output1_0, /<section class="ls-section is-gray">/);
assert.match(output1_0, /<pre class="ls-code is-rust"><code data-language="rust">/);
assert.match(output1_0, /fn main\(\) \{/);
assert.match(output1_0, /<pre class="ls-code is-flow"><code data-language="flow">/);
assert.match(output1_0, /<span class="ls-tag">@todo<\/span>/);
assert.match(output1_0, /<input type="checkbox" checked disabled> Done item/);
assert.match(output1_0, /<a href="#Flow Intent" class="ls-reference">\[\[Flow Intent\]\]<\/a>/);
assert.match(output1_0, /<span class="ls-tag">@simple<\/span>/);
assert.match(output1_0, /<a href="#Parser Contract" class="ls-reference">\[\[Parser Contract\]\]<\/a>/);
assert.match(output1_0, /<blockquote>Keep syntax small\.<\/blockquote>/);
assert.match(output1_0, /<section class="ls-section is-intent">/);
assert.match(output1_0, /<h2>Shopping<\/h2>/);
assert.match(output1_0, /<h2>list<\/h2>/);
assert.match(output1_0, /<pre class="ls-code is-md"><code data-language="md">/);
assert.match(output1_0, /# Markdown island/);
assert.match(output1_0, /<pre class="ls-code is-elixir"><code data-language="elixir">/);
assert.match(output1_0, /defmodule Notes do/);

// Test LeStupid 2.0 (Minimal Syntax & AI-Native Features)
const output2_0 = render(`
===
title: LeStupid 2.0 Demo
===

Koyu Bölüm:
  # LeStupid 2.0
  Write like a human.

Kutular (3 Kolon):
  Kart:
    # Feature 1
    Detail text.
  Kart:
    # Feature 2
    Detail text.
    Buton: "Go" -> /go

İletişim Formu:
  Adınız Soyadınız
  E-posta
  Buton: Gönder -> /send

En Çok Satanlar:
  Ürün, Fiyat, Stok
  Laptop, 45k, Var
  Telefon, 30k, Yok
`);

const outputIndentTolerance = render(`
===
title: Indent Tolerance
===

grid(2):
 card:
   # Rounded Indent
	card:
	  # Tab Indent
`);

// 1. Check indent-based block closing (no unclosed tag errors, correct structural output)
assert.match(output2_0, /<section class="ls-section is-dark">/);
assert.match(output2_0, /<div class="ls-grid is-3" data-columns="3">/);
assert.match(output2_0, /<article class="ls-card">/);
assert.match(output2_0, /<a href="\/go" class="ls-button">Go<\/a>/);

// 2. Check Auto-form and slugification
assert.match(output2_0, /<form class="ls-form">/);
assert.match(output2_0, /<label class="ls-form-label">Adınız Soyadınız<input name="adiniz_soyadiniz" type="text"><\/label>/);
assert.match(output2_0, /<label class="ls-form-label">E-posta<input name="eposta" type="email"><\/label>/);
assert.match(output2_0, /<button type="submit" class="ls-button">Gönder<\/button>/);

// 3. Check Auto-tables
assert.match(output2_0, /<div class="ls-table-container">/);
assert.match(output2_0, /<table class="ls-table">/);
assert.match(output2_0, /<th>Ürün<\/th>/);
assert.match(output2_0, /<td>Laptop<\/td>/);
assert.match(output2_0, /<td>Yok<\/td>/);

// 4. Check indentation tolerance
assert.match(outputIndentTolerance, /<div class="ls-grid is-2" data-columns="2">/);
assert.match(outputIndentTolerance, /<h1>Rounded Indent<\/h1>/);
assert.match(outputIndentTolerance, /<h1>Tab Indent<\/h1>/);

// 5. Check Definition List colon safety
const outputColonSafety = render(`
İsim: Ahmet
Not: Bu çok uzun bir açıklamadır ve asla tanım listesi olmamalıdır.
`);
assert.match(outputColonSafety, /<dl><dt>İsim<\/dt><dd>Ahmet<\/dd><\/dl>/);
assert.match(outputColonSafety, /<p>Not: Bu çok uzun bir açıklamadır ve asla tanım listesi olmamalıdır.<\/p>/);

console.log("render.test.js passed");
