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

const languageIslands = new Set([
  "md",
  "markdown",
  "html",
  "html5",
  "css",
  "js",
  "javascript",
  "ts",
  "typescript",
  "elixir",
  "abap",
  "rust",
  "python",
  "sql",
  "json",
  "yaml",
  "mermaid"
]);

function render(source) {
  const lines = normalizeIndentation(source).replace(/\r\n/g, "\n").split("\n");
  const context = {
    html: [],
    metadata: {},
    stack: [],
    inFrontMatter: false,
    frontMatterSeen: false,
    tableRows: null
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (isInsideCode(context) && !line.startsWith(":")) {
      const codeBlock = context.stack[context.stack.length - 1];
      const currentIndent = getIndent(rawLine);
      if (line && currentIndent <= codeBlock.indent) {
        while (context.stack.length > 0 && context.stack[context.stack.length - 1].indent >= currentIndent) {
          const block = context.stack.pop();
          context.html.push(closeTagFor(block.type));
        }
      } else {
        context.html.push(escapeHtml(stripCodeIndent(rawLine, codeBlock.indent)));
        continue;
      }
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

    // Process indentation-based block closing for non-empty lines
    if (!line.startsWith(":")) {
      const currentIndent = getIndent(rawLine);
      while (context.stack.length > 0 && context.stack[context.stack.length - 1].indent >= currentIndent) {
        const block = context.stack.pop();
        context.html.push(closeTagFor(block.type));
      }
    }

    // Process table aggregation
    const isTable = isTableRow(line, isInForm(context));
    if (isTable) {
      if (!context.tableRows) {
        context.tableRows = [];
      }
      context.tableRows.push(isTable);
      continue;
    } else {
      if (context.tableRows) {
        renderTable(context.tableRows, context.html);
        context.tableRows = null;
      }
    }

    if (line.startsWith(":")) {
      closeBlock(line.slice(1), context);
      continue;
    }

    const block = parseBlockOpener(line, rawLine);
    if (block) {
      block.indent = getIndent(rawLine);
      openBlock(block, context);
      continue;
    }

    renderInlineBlock(line, context);
  }

  if (context.tableRows) {
    renderTable(context.tableRows, context.html);
    context.tableRows = null;
  }

  closeRemainingBlocks(context);
  return wrapDocument(context.html.join("\n"), context.metadata, context.frontMatterSeen);
}

function normalizeIndentation(source) {
  return source
    .replace(/\t/g, "  ")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^ +/, (spaces) => " ".repeat(Math.round(spaces.length / 2) * 2)))
    .join("\n");
}

function getIndent(rawLine) {
  const leadingWhitespace = (rawLine.match(/^[ \t]*/) || [""])[0];
  const spacesOnly = leadingWhitespace.replace(/\t/g, "  ");
  return spacesOnly.length;
}

function isInForm(context) {
  return context.stack.length > 0 && context.stack[context.stack.length - 1].type === "form";
}

function isListLine(line) {
  return /^[-\*•]\s+/.test(line) || /^\d+\.\s+/.test(line) || /^- \[[ xX]\]\s+/.test(line);
}

function isTableRow(line, inForm) {
  if (inForm) return null;
  if (/^[xo]\s+/i.test(line)) return null;
  if (isListLine(line)) return null;

  let parts = [];
  if (line.includes("|")) {
    parts = line.split("|").map(p => p.trim());
  } else if (line.includes(",")) {
    parts = line.split(",").map(p => p.trim());
  } else if (/\s{2,}/.test(line)) {
    parts = line.split(/\s{2,}/).map(p => p.trim());
  }

  if (parts.length > 1 && parts.every(p => p.length > 0)) {
    return parts;
  }
  return null;
}

function readMetadata(line, metadata) {
  const pair = line.match(/^([^:]+):\s*(.*)$/);
  if (pair) metadata[normalizeKey(pair[1])] = pair[2].trim();
}

function parseBlockOpener(line, rawLine) {
  const clean = line.trim().toLowerCase();

  const namedCodeMatch = clean.match(/^(kod|code|flow|akis|akış):\s+(.+)$/);
  if (namedCodeMatch) {
    const kind = namedCodeMatch[1];
    const language = kind === "flow" || kind === "akis" || kind === "akış" ? "flow" : "intent";
    return { type: "code", options: [language] };
  }

  if (!clean.endsWith(":")) return null;

  const content = clean.slice(0, -1).trim();

  if (content === "bölüm" || content === "section" || content === "ana bölüm" || content === "hero bölüm") {
    return { type: "section", options: [] };
  }
  const sectionMatch = content.match(/^(koyu|gri|açık|açik|tam ekran|dark|gray|grey|light|full|full-screen)\s+(bölüm|section)$/);
  if (sectionMatch) {
    const style = styleAliases.get(sectionMatch[1]) || sectionMatch[1];
    return { type: "section", options: [style] };
  }

  if (content === "kutular" || content === "izgara" || content === "grid" || content === "yan yana kutular") {
    return { type: "grid", options: [] };
  }
  const gridMatch = content.match(/^(kutular|izgara|grid|yan yana kutular)\s*\((?:(\d+)\s*(?:kolon|column|columns|adet|grup)?)?\)$/);
  if (gridMatch) {
    const cols = gridMatch[2] || "auto";
    return { type: "grid", options: [cols] };
  }

  if (content === "kart" || content === "card") {
    return { type: "card", options: [] };
  }

  if (content.endsWith("formu") || content === "form") {
    return { type: "form", options: [] };
  }

  if (content === "kod" || content === "code") {
    return { type: "code", options: ["text"] };
  }
  if (content === "flow" || content === "akis" || content === "akış") {
    return { type: "code", options: ["flow"] };
  }
  if (languageIslands.has(content)) {
    return { type: "code", options: [content] };
  }
  const codeMatch = content.match(/^(kod|code)\s*\(([^)]+)\)$/);
  if (codeMatch) {
    return { type: "code", options: [codeMatch[2].trim()] };
  }

  const match = line.match(/^([\p{L}\w-]+)(?:\(([^)]*)\))?:$/u);
  if (match) {
    const rawName = match[1].toLowerCase();
    const type = aliases.get(rawName);
    if (type) {
      const options = (match[2] || "")
        .split(/\s+/)
        .map((option) => styleAliases.get(option.toLowerCase()) || option.toLowerCase())
        .filter(Boolean);
      return { type, options };
    }
  }

  if (line.trim().endsWith(":")) {
    return { type: "section", options: ["intent"], title: line.trim().slice(0, -1).trim() };
  }

  return null;
}

function openBlock(block, context) {
  const className = ["ls-" + block.type, ...block.options.map((option) => "is-" + option)].join(" ");

  if (block.type === "section") {
    context.html.push(`<section class="${escapeAttribute(className)}">`);
    if (block.title) {
      context.html.push(`<h2>${renderInline(block.title)}</h2>`);
    }
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

function stripCodeIndent(rawLine, indentAmount) {
  const regex = new RegExp(`^ {0,${indentAmount}}`);
  return rawLine.replace(regex, "");
}

function renderInlineBlock(line, context) {
  const html = context.html;

  if (isInForm(context)) {
    const formRow = renderFormRow(line, true);
    if (formRow) {
      html.push(formRow);
      return;
    }
  }

  // Pre-emptively match standalone Action buttons & links (so they don't match Definition list syntax)
  const actionMatch = line.match(/^(buton|button|tıkla|tikla|link):\s*(.*?)\s*->\s*(.*?)$/i);
  if (actionMatch) {
    const type = actionMatch[1].toLowerCase();
    const text = actionMatch[2].replace(/^["']|["']$/g, "").trim();
    const url = actionMatch[3].trim();
    const className = (type === "link") ? "ls-link" : "ls-button";
    html.push(`<p><a href="${escapeAttribute(url)}" class="${className}">${renderInline(text)}</a></p>`);
    return;
  }

  const tagLineMatch = line.match(/^tag:\s*(.+)$/i);
  if (tagLineMatch) {
    html.push(`<p><span class="ls-tag">@${escapeHtml(tagLineMatch[1].trim())}</span></p>`);
    return;
  }

  const refLineMatch = line.match(/^ref:\s*(.+)$/i);
  if (refLineMatch) {
    const label = refLineMatch[1].trim();
    html.push(`<p><a href="#${escapeAttribute(label)}" class="ls-reference">[[${escapeHtml(label)}]]</a></p>`);
    return;
  }

  const quoteLineMatch = line.match(/^quote:\s*(.+)$/i);
  if (quoteLineMatch) {
    html.push(`<blockquote>${renderInline(quoteLineMatch[1].trim())}</blockquote>`);
    return;
  }

  if (line.startsWith("### ")) {
    html.push(`<h3>${renderInline(line.slice(4))}</h3>`);
  } else if (line.startsWith("## ")) {
    html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
  } else if (line.startsWith("# ")) {
    html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
  } else if (line === "---") {
    html.push("<hr>");
  } else if (line.startsWith("> ")) {
    html.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`);
  } else if (/^- \[[ xX]\]\s+/.test(line)) {
    const checked = /^- \[[xX]\]/.test(line);
    const label = line.replace(/^- \[[ xX]\]\s+/, "");
    html.push(`<label class="ls-task"><input type="checkbox"${checked ? " checked" : ""} disabled> ${renderInline(label)}</label>`);
  } else if (/^x\s+/i.test(line)) {
    html.push(`<label class="ls-task"><input type="checkbox" checked disabled> ${renderInline(line.replace(/^x\s+/i, ""))}</label>`);
  } else if (/^o\s+/i.test(line)) {
    html.push(`<label class="ls-task"><input type="checkbox" disabled> ${renderInline(line.replace(/^o\s+/i, ""))}</label>`);
  } else if (line.startsWith("- ")) {
    html.push(`<ul><li>${renderInline(line.slice(2))}</li></ul>`);
  } else if (/^\d+\.\s+/.test(line)) {
    html.push(`<ol><li>${renderInline(line.replace(/^\d+\.\s+/, ""))}</li></ol>`);
  } else if (/^([\p{L}\w\s-]{1,15}):\s+(.+)$/u.test(line)) {
    const dlMatch = line.match(/^([\p{L}\w\s-]{1,15}):\s+(.+)$/u);
    const term = dlMatch[1];
    const termLower = term.trim().toLowerCase();
    const excludedTerms = new Set(["not", "note", "uyarı", "uyari", "warning", "dikkat", "attention", "http", "https"]);
    if (excludedTerms.has(termLower)) {
      html.push(`<p>${renderInline(line)}</p>`);
    } else {
      const definition = dlMatch[2];
      html.push(`<dl><dt>${renderInline(term.trim())}</dt><dd>${renderInline(definition.trim())}</dd></dl>`);
    }
  } else if (line.includes("|") && !line.startsWith("|")) {
    const formRow = renderFormRow(line, false);
    if (formRow) html.push(formRow);
    else html.push(`<p>${renderInline(line)}</p>`);
  } else {
    html.push(`<p>${renderInline(line)}</p>`);
  }
}

function renderFormRow(line, inForm) {
  if (line.includes("|") && !line.startsWith("|")) {
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length >= 3) {
      const [name, type, label] = parts;
      const isTextarea = type === "alan" || type === "textarea";
      if (isTextarea) {
        return `<label class="ls-form-label">${escapeHtml(label)}<textarea name="${escapeAttribute(name)}"></textarea></label>`;
      }
      const htmlType = type === "metin" ? "text" : type;
      return `<label class="ls-form-label">${escapeHtml(label)}<input name="${escapeAttribute(name)}" type="${escapeAttribute(htmlType)}"></label>`;
    }
  }

  if (inForm) {
    const lower = line.toLowerCase();
    if (lower.startsWith("buton:") || line.includes("->") || lower.includes("butonu")) {
      const btnMatch = line.match(/(?:buton|button|tıkla):\s*["']?([^"']+)["']?/i) || [null, line];
      let btnText = btnMatch[1].replace(/\s+(butonu|button|gönder|submit)$/i, "").trim();
      btnText = btnText.split("->")[0].trim().replace(/^["']|["']$/g, "");
      return `<button type="submit" class="ls-button">${escapeHtml(btnText)}</button>`;
    }

    const colonMatch = line.match(/^([^:]+):\s*\[([^\]]+)\]$/);
    if (colonMatch) {
      const label = colonMatch[1].trim();
      const typeHint = colonMatch[2].trim().toLowerCase();
      const name = slugify(label);
      
      const isTextarea = typeHint.includes("uzun") || typeHint.includes("textarea") || typeHint.includes("alan") || typeHint.includes("mesaj");
      if (isTextarea) {
        return `<label class="ls-form-label">${escapeHtml(label)}<textarea name="${escapeAttribute(name)}"></textarea></label>`;
      }
      
      let htmlType = "text";
      if (typeHint.includes("e-posta") || typeHint.includes("email")) htmlType = "email";
      else if (typeHint.includes("şifre") || typeHint.includes("sifre") || typeHint.includes("gizli") || typeHint.includes("password")) htmlType = "password";
      else if (typeHint.includes("sayı") || typeHint.includes("sayi") || typeHint.includes("number")) htmlType = "number";
      else if (typeHint.includes("telefon") || typeHint.includes("tel") || typeHint.includes("phone")) htmlType = "tel";
      
      return `<label class="ls-form-label">${escapeHtml(label)}<input name="${escapeAttribute(name)}" type="${escapeAttribute(htmlType)}"></label>`;
    } else {
      const label = line.trim();
      const name = slugify(label);
      const labelLower = label.toLowerCase();
      
      let htmlType = "text";
      let isTextarea = false;
      
      if (labelLower.includes("e-posta") || labelLower.includes("email")) htmlType = "email";
      else if (labelLower.includes("şifre") || labelLower.includes("sifre") || labelLower.includes("gizli") || labelLower.includes("password")) htmlType = "password";
      else if (labelLower.includes("sayı") || labelLower.includes("sayi") || labelLower.includes("yaş") || labelLower.includes("yas")) htmlType = "number";
      else if (labelLower.includes("telefon") || labelLower.includes("tel") || labelLower.includes("phone")) htmlType = "tel";
      else if (labelLower.includes("mesaj") || labelLower.includes("açıklama") || labelLower.includes("aciklama") || labelLower.includes("detay")) isTextarea = true;
      
      if (isTextarea) {
        return `<label class="ls-form-label">${escapeHtml(label)}<textarea name="${escapeAttribute(name)}"></textarea></label>`;
      }
      return `<label class="ls-form-label">${escapeHtml(label)}<input name="${escapeAttribute(name)}" type="${escapeAttribute(htmlType)}"></label>`;
    }
  }

  return null;
}

function renderTable(rows, html) {
  if (rows.length === 0) return;
  html.push('<div class="ls-table-container">');
  html.push('<table class="ls-table">');
  
  const headers = rows[0];
  html.push('<thead><tr>');
  for (const h of headers) {
    html.push(`<th>${renderInline(h)}</th>`);
  }
  html.push('</tr></thead>');

  if (rows.length > 1) {
    html.push('<tbody>');
    for (let i = 1; i < rows.length; i++) {
      html.push('<tr>');
      for (const cell of rows[i]) {
        html.push(`<td>${renderInline(cell)}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</tbody>');
  }

  html.push('</table>');
  html.push('</div>');
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[ğĞ]/g, "g")
    .replace(/[üÜ]/g, "u")
    .replace(/[şŞ]/g, "s")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[çÇ]/g, "c")
    .replace(/[^a-z0-9_]/g, "");
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

  // Conversational arrow actions in LeStupid 2.0
  html = html.replace(/(?:buton|button|tıkla|tikla):\s*["']?([^"'\n]+?)["']?\s*->\s*([^\s\n]+)/gi, (_match, text, url) => {
    return `<a href="${escapeAttribute(url)}" class="ls-button">${text}</a>`;
  });

  html = html.replace(/link:\s*["']?([^"'\n]+?)["']?\s*->\s*([^\s\n]+)/gi, (_match, text, url) => {
    return `<a href="${escapeAttribute(url)}" class="ls-link">${text}</a>`;
  });

  html = html.replace(/\[?["']?([^"'\n\]]+?)["']?\s*->\s*([^\s\n\]]+)\]?/g, (_match, text, url) => {
    const isButton = /butonu|button$/i.test(text);
    const cleanText = text.replace(/\s+(butonu|button)$/i, "").trim();
    const className = isButton ? "ls-button" : "ls-link";
    return `<a href="${escapeAttribute(url)}" class="${className}">${cleanText}</a>`;
  });

  html = html.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");
  html = html.replace(/~([^~]+)~/g, "<del>$1</del>");
  html = html.replace(/==([^=]+)==/g, "<mark>$1</mark>");
  html = html.replace(/\^([^^]+)\^/g, "<sup>$1</sup>");
  html = html.replace(/(?<!\w)sub\(([^)]+)\)/g, "<sub>$1</sub>");
  html = html.replace(/:([a-z0-9_+-]+):/gi, '<span class="ls-emoji" data-emoji="$1">:$1:</span>');
  html = html.replace(/\[\[([^\]]+)\]\]/g, '<a href="#$1" class="ls-reference">[[$1]]</a>');
  html = html.replace(/(^|\s)([@#])([\p{L}0-9_-]+)/gu, '$1<span class="ls-tag">$2$3</span>');
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
    "    blockquote { margin: 16px 0; padding-left: 16px; border-left: 4px solid #b42c3d; color: #3d4845; }",
    "    hr { border: 0; border-top: 1px solid #d8d2c6; margin: 28px 0; }",
    "    mark { padding: 0 4px; border-radius: 4px; background: #ffe08a; }",
    "    dl { margin: 14px 0; } dt { font-weight: 800; } dd { margin: 4px 0 0 18px; }",
    "    .ls-task { display: block; margin: 8px 0; }",
    "    .ls-emoji { font-weight: 800; color: #b42c3d; }",
    "    .ls-tag { display: inline-block; padding: 2px 7px; border-radius: 999px; color: #7a2430; background: #f4d7dc; font-size: .9em; font-weight: 800; }",
    "    .ls-reference { color: #25605a; font-weight: 800; text-decoration: none; border-bottom: 1px dashed currentColor; }",
    "    .is-dark { color: #f8fafc; background: #25302f; }",
    "    .is-gray { background: #e7e3da; }",
    "    .ls-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px; }",
    "    .ls-card { background: #ffffff; border: 1px solid #ddd6ca; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }",
    "    .ls-card h1 { font-size: 1.5rem; }",
    "    pre { overflow: auto; max-width: 100%; padding: 16px; border-radius: 8px; color: #ecfdf5; background: #121817; }",
    "    code { font-family: Consolas, 'Cascadia Mono', 'SFMono-Regular', monospace; }",
    "    pre code::before { content: attr(data-language); display: block; margin-bottom: 10px; color: #9ca3af; font: 700 12px/1 system-ui, sans-serif; text-transform: uppercase; }",
    "    .ls-button { display: inline-block; margin-top: 8px; padding: 10px 18px; border-radius: 8px; background: #b42c3d; color: white; text-decoration: none; font-weight: 700; border: none; cursor: pointer; transition: background 0.2s; }",
    "    .ls-button:hover { background: #962230; }",
    "    .ls-link { color: #b42c3d; text-decoration: none; font-weight: 600; }",
    "    .ls-link:hover { text-decoration: underline; }",
    "    .ls-form-label { display: block; margin-bottom: 16px; font-weight: 600; }",
    "    .ls-form-label input, .ls-form-label textarea { display: block; width: 100%; max-width: 400px; margin-top: 6px; padding: 10px; border: 1px solid #ddd6ca; border-radius: 8px; font: inherit; box-sizing: border-box; }",
    "    .ls-table-container { overflow-x: auto; margin: 20px 0; border: 1px solid #ddd6ca; border-radius: 12px; background: white; }",
    "    .ls-table { width: 100%; border-collapse: collapse; text-align: left; }",
    "    .ls-table th, .ls-table td { padding: 14px 18px; border-bottom: 1px solid #f0ede4; }",
    "    .ls-table th { background: #fbfaf8; font-weight: 700; color: #3d4845; }",
    "    .ls-table tr:last-child td { border-bottom: none; }",
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
