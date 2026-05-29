const http = require("http");
const fs = require("fs");
const path = require("path");
const { render } = require("./lestupid");

const port = Number(process.env.PORT || 4174);
const root = path.join(__dirname, "..", "examples");
const appRoot = path.join(__dirname, "web");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ls": "text/plain; charset=utf-8"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/") {
    serveFile(path.join(appRoot, "index.html"), response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/editor.css") {
    serveFile(path.join(appRoot, "editor.css"), response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/editor.js") {
    serveFile(path.join(appRoot, "editor.js"), response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/source") {
    serveFile(path.join(root, "home.ls"), response);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/render") {
    readBody(request, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const html = render(String(payload.source || ""));
        response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ html }));
      } catch (error) {
        response.writeHead(400, { "content-type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ error: error.message }));
      }
    });
    return;
  }

  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = pathname === "/" ? "/home.html" : pathname;
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  serveFile(filePath, response);
});

server.listen(port, () => {
  console.log(`LeStupid HTML renderer demo: http://127.0.0.1:${port}`);
});

function serveFile(filePath, response) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(data);
  });
}

function readBody(request, callback) {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
    if (body.length > 1024 * 1024) {
      request.destroy();
    }
  });
  request.on("end", () => callback(body));
}
