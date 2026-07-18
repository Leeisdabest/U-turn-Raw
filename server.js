const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

function send(res, status, type, body) {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

function sendFile(res, fileName) {
  const safeName = path.basename(fileName);
  const filePath = path.join(PUBLIC_DIR, safeName);

  if (!fs.existsSync(filePath)) {
    send(res, 404, "text/plain; charset=utf-8", "File not found");
    return;
  }

  const ext = path.extname(safeName).toLowerCase();
  const type = ext === ".lua" ? "text/plain; charset=utf-8" : "application/octet-stream";
  send(res, 200, type, fs.readFileSync(filePath));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/" || url.pathname === "/health") {
    send(
      res,
      200,
      "text/html; charset=utf-8",
      `<h1>Nin's Replay Host</h1>
       <p>Replay file:</p>
       <p><a href="/u-turn-replay-only.lua">/u-turn-replay-only.lua</a></p>`
    );
    return;
  }

  if (url.pathname === "/u-turn-replay-only.lua") {
    sendFile(res, "u-turn-replay-only.lua");
    return;
  }

  send(res, 404, "text/plain; charset=utf-8", "Not found");
});

server.listen(PORT, () => {
  console.log(`Replay host running on port ${PORT}`);
});
