#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { render } = require("./lestupid");

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: node src/cli.js <input.ls> <output.html>");
  process.exit(1);
}

const source = fs.readFileSync(inputPath, "utf8");
const html = render(source);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");
