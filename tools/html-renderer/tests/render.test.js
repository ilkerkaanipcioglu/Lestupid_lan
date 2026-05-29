const assert = require("assert");
const { render } = require("../src/lestupid");

const output = render(`
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

assert.match(output, /<html lang="tr">/);
assert.match(output, /<title>Deneme<\/title>/);
assert.match(output, /<section class="ls-section is-dark">/);
assert.match(output, /<h1>Merhaba<\/h1>/);
assert.match(output, /<a href="\/kesfet" class="ls-button">Keşfet<\/a>/);
assert.match(output, /<h1>Hello<\/h1>/);
assert.match(output, /<a href="\/explore" class="ls-button">Explore<\/a>/);
assert.match(output, /<section class="ls-section is-gray">/);
assert.match(output, /<pre class="ls-code is-rust"><code data-language="rust">/);
assert.match(output, /fn main\(\) \{/);

console.log("render.test.js passed");
