const aliases = new Map([
  ["section", "section"],
  ["bolum", "section"],
  ["bölüm", "section"],
  ["grid", "grid"],
  ["izgara", "grid"],
  ["card", "card"],
  ["kart", "card"],
  ["form", "form"],
  ["code", "code"],
  ["kod", "code"]
]);

const styleAliases = new Map([
  ["dark", "dark"],
  ["koyu", "dark"],
  ["light", "light"],
  ["acik", "light"],
  ["açık", "light"],
  ["gray", "gray"],
  ["grey", "gray"],
  ["gri", "gray"],
  ["full", "full"],
  ["full-screen", "full"],
  ["tam-ekran", "full"],
  ["button", "button"],
  ["buton", "button"]
]);

function render(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const context = {
    html: [],
    metadata: {},
    stack: [],
    inFrontMatter: false,
    frontMatterSeen: false
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (isInsideCode(context) && !line.startsWith(":")) {
      context.html.push(escapeHtml(stripCodeIndent(rawLine)));
      continue;
    }

    if (!line) continue;

    if (line === "===") {
      context.inFrontMatter = !context.inFrontMatter;
      context.frontMatterSeen = true;
      continue;
    }

    if (context.inFrontMatter) {
      readMetadata(line, context.metadata);
      continue;
    }

    if (line.startsWith(":")) {
      closeBlock(line.slice(1), context);
      continue;
    }

    const block = parseBlockOpener(line);
    if (block) {
      openBlock(block, context);
      continue;
    }

    renderInlineBlock(line, context.html);
  }

  closeRemainingBlocks(context);
  return wrapDocument(context.html.join("\n"), context.metadata, context.frontMatterSeen);
}

function readMetadata(line, metadata) {
  const pair = line.match(/^([^:]+):\s*(.*)$/);
  if (pair) metadata[normalizeKey(pair[1])] = pair[2].trim();
}

function parseBlockOpener(line) {
  const match = line.match(/^([\p{L}\w-]+)(?:\(([^)]*)\))?:$/u);
  if (!match) return null;

  const rawName = match[1].toLowerCase();
  const type = aliases.get(rawName);
  if (!type) return null;

  const options = (match[2] || "")
    .split(/\s+/)
    .map((option) => styleAliases.get(option.toLowerCase()) || option.toLowerCase())
    .filter(Boolean);

  return { type, options };
}

function openBlock(block, context) {
  const className = ["ls-" + block.type, ...block.options.map((option) => "is-" + option)].join(" ");

  if (block.type === "section") {
    context.html.push(`<section class="${escapeAttribute(className)}">`);
  } else if (block.type === "grid") {
    const columns = block.options.find((option) => /^\d+$/.test(option)) || "auto";
    context.html.push(`<div class="${escapeAttribute(className)}" data-columns="${escapeAttribute(columns)}">`);
  } else if (block.type === "card") {
    context.html.push(`<article class="${escapeAttribute(className)}">`);
  } else if (block.type === "form") {
    context.html.push(`<form class="${escapeAttribute(className)}">`);
  } else if (block.type === "code") {
    const language = block.options[0] || "text";
    context.html.push(`<pre class="${escapeAttribute(className)}"><code data-language="${escapeAttribute(language)}">`);
  }

  context.stack.push(block);
}

function closeBlock(rawName, context) {
  const expectedType = aliases.get(rawName.trim().toLowerCase());
  while (context.stack.length > 0) {
    const block = context.stack.pop();
    context.html.push(closeTagFor(block.type));
    if (!expectedType || block.type === expectedType) break;
  }
}

function closeRemainingBlocks(context) {
  while (context.stack.length > 0) {
    context.html.push(closeTagFor(context.stack.pop().type));
  }
}

function closeTagFor(type) {
  if (type === "section") return "</section>";
  if (type === "grid") return "</div>";
  if (type === "card") return "</article>";
  if (type === "form") return "</form>";
  if (type === "code") return "</code></pre>";
  return "";
}

function isInsideCode(context) {
  return context.stack.length > 0 && context.stack[context.stack.length - 1].type === "code";
}

function stripCodeIndent(rawLine) {
  return rawLine.replace(/^ {2}/, "");
}

function renderInlineBlock(line, html) {
  if (line.startsWith("### ")) {
    html.push(`<h3>${renderInline(line.slice(4))}</h3>`);
  } else if (line.startsWith("## ")) {
    html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
  } else if (line.startsWith("# ")) {
    html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
  } else if (line.startsWith("> ")) {
    html.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`);
  } else if (line.startsWith("- ")) {
    html.push(`<ul><li>${renderInline(line.slice(2))}</li></ul>`);
  } else if (/^\d+\.\s+/.test(line)) {
    html.push(`<ol><li>${renderInline(line.replace(/^\d+\.\s+/, ""))}</li></ol>`);
  } else if (line.includes("|") && !line.startsWith("|")) {
    html.push(renderFormRow(line));
  } else {
    html.push(`<p>${renderInline(line)}</p>`);
  }
}

function renderFormRow(line) {
  const parts = line.split("|").map((part) => part.trim());
  if (parts.length < 3) return `<p>${renderInline(line)}</p>`;

  const [name, type, label] = parts;
  const isTextarea = type === "alan" || type === "textarea";
  if (isTextarea) {
    return `<label>${escapeHtml(label)}<textarea name="${escapeAttribute(name)}"></textarea></label>`;
  }

  const htmlType = type === "metin" ? "text" : type;
  return `<label>${escapeHtml(label)}<input name="${escapeAttribute(name)}" type="${escapeAttribute(htmlType)}"></label>`;
}

function renderInline(value) {
  let html = escapeHtml(value);

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
    return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}">`;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, href) => {
    const textParts = text.split(/\s+/).filter(Boolean);
    const cleanTextParts = textParts.filter((part) => !isButtonMarker(part));
    const parts = href.split(/\s+/).filter(Boolean);
    const url = parts[0] || "#";
    const isButton = [...textParts, ...parts.slice(1)].some(isButtonMarker);
    const classAttr = isButton ? ' class="ls-button"' : "";
    return `<a href="${escapeAttribute(url)}"${classAttr}>${cleanTextParts.join(" ")}</a>`;
  });

  html = html.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  return html;
}

function isButtonMarker(value) {
  return styleAliases.get(value.replace(/^!/, "").toLowerCase()) === "button";
}

function wrapDocument(body, metadata, hasFrontMatter) {
  if (!hasFrontMatter) return body + "\n";

  const title = metadata.title || metadata["başlık"] || metadata.baslik || "LeStupid";
  const language = metadata.language || metadata.dil || "en";
  const description = metadata.description || metadata["açıklama"] || metadata.aciklama || "";

  return [
    "<!doctype html>",
    `<html lang="${escapeAttribute(language)}">`,
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <title>${escapeHtml(title)}</title>`,
    description ? `  <meta name="description" content="${escapeAttribute(description)}">` : "",
    "  <style>",
    "    body { margin: 0; font: 16px/1.55 system-ui, sans-serif; color: #172026; background: #f6f4ef; }",
    "    section, .ls-grid { padding: 40px max(24px, calc((100vw - 960px) / 2)); }",
    "    h1 { margin: 0 0 12px; font-size: clamp(2rem, 4vw, 4rem); line-height: 1.05; }",
    "    p { max-width: 68ch; }",
    "    .is-dark { color: #f8fafc; background: #25302f; }",
    "    .is-gray { background: #e7e3da; }",
    "    .ls-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }",
    "    .ls-card { background: #ffffff; border: 1px solid #ddd6ca; border-radius: 8px; padding: 20px; }",
    "    .ls-card h1 { font-size: 1.25rem; }",
    "    pre { overflow: auto; max-width: 100%; padding: 16px; border-radius: 8px; color: #ecfdf5; background: #121817; }",
    "    code { font-family: Consolas, 'Cascadia Mono', 'SFMono-Regular', monospace; }",
    "    pre code::before { content: attr(data-language); display: block; margin-bottom: 10px; color: #9ca3af; font: 700 12px/1 system-ui, sans-serif; text-transform: uppercase; }",
    "    .ls-button { display: inline-block; margin-top: 8px; padding: 10px 14px; border-radius: 6px; background: #b42c3d; color: white; text-decoration: none; font-weight: 700; }",
    "  </style>",
    "</head>",
    "<body>",
    body,
    "</body>",
    "</html>",
    ""
  ].filter(Boolean).join("\n");
}

function normalizeKey(value) {
  return value.trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

module.exports = { render };
