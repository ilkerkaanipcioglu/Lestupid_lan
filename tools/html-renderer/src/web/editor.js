const workspace = document.querySelector("#workspace");
const sourceInput = document.querySelector("#sourceInput");
const previewFrame = document.querySelector("#previewFrame");
const statusText = document.querySelector("#statusText");
const resetButton = document.querySelector("#resetButton");
const editButton = document.querySelector("#editButton");

let originalSource = "";
let renderTimer = 0;

start();

async function start() {
  const response = await fetch("/api/source");
  originalSource = await response.text();
  sourceInput.value = originalSource;
  await renderSource();
}

sourceInput.addEventListener("input", () => {
  statusText.textContent = "Rendering...";
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderSource, 180);
});

resetButton.addEventListener("click", async () => {
  sourceInput.value = originalSource;
  await renderSource();
});

editButton.addEventListener("click", () => {
  const isOpening = workspace.classList.toggle("preview-only");
  const isEditing = !isOpening;
  editButton.setAttribute("aria-expanded", String(isEditing));
  if (isEditing) {
    sourceInput.focus();
  }
});

async function renderSource() {
  try {
    const response = await fetch("/api/render", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source: sourceInput.value })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Render failed");
    }

    previewFrame.srcdoc = makePreviewSafe(result.html);
    statusText.textContent = "Rendered";
  } catch (error) {
    statusText.textContent = error.message;
  }
}

function makePreviewSafe(html) {
  const guard = [
    "<style>",
    ".ls-preview-toast { position: fixed; right: 16px; bottom: 16px; z-index: 9999; max-width: min(320px, calc(100vw - 32px)); padding: 10px 12px; border-radius: 8px; color: #fff; background: #172026; box-shadow: 0 10px 30px rgba(0,0,0,.25); font: 700 14px/1.35 system-ui, sans-serif; opacity: 0; transform: translateY(8px); transition: opacity .18s ease, transform .18s ease; }",
    ".ls-preview-toast.is-visible { opacity: 1; transform: translateY(0); }",
    "</style>",
    "<script>",
    "var previewToastTimer;",
    "function showPreviewToast(message) {",
    "  var toast = document.querySelector('.ls-preview-toast');",
    "  if (!toast) {",
    "    toast = document.createElement('div');",
    "    toast.className = 'ls-preview-toast';",
    "    document.body.appendChild(toast);",
    "  }",
    "  toast.textContent = message;",
    "  toast.classList.add('is-visible');",
    "  clearTimeout(previewToastTimer);",
    "  previewToastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 1600);",
    "}",
    "document.addEventListener('click', function (event) {",
    "  var link = event.target.closest && event.target.closest('a');",
    "  if (!link) return;",
    "  event.preventDefault();",
    "  var label = (link.textContent || 'Link').trim();",
    "  var href = link.getAttribute('href') || '#';",
    "  showPreviewToast('Demo action: ' + label + ' -> ' + href);",
    "});",
    "<\/script>"
  ].join("");

  if (html.includes("</body>")) {
    return html.replace("</body>", guard + "</body>");
  }

  return html + guard;
}
