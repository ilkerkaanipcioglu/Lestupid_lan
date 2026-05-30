# LeStupid HTML Renderer

This is an experimental tool, not the definition of the language.

The language source of truth is [`../../lestupid.md`](../../lestupid.md).

## Run

```bash
npm test
npm run build:example
```

Build output:

```text
examples/home.html
```

Convert a file:

```bash
node src/cli.js examples/home.ls examples/home.html
```
