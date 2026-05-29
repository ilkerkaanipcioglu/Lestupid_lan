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

    previewFrame.srcdoc = result.html;
    statusText.textContent = "Rendered";
  } catch (error) {
    statusText.textContent = error.message;
  }
}
