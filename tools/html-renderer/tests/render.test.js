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

// Test LeStupid 2.0 (Zero-Syntax & AI-Native Features)
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

console.log("render.test.js passed");
