const { parse } = require("url");
const { readFileSync } = require("fs");
const next = require("next");

const sslPort = 443;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

if (dev) {
  const { createServer } = require("http");

  app
    .prepare()
    .then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(3000, (err) => {
        if (err) throw err;
        console.log(" > Ready on http://localhost:3000");
      });
    })
    .catch((e) => console.error(new Date(), e));
} else {
  const { createServer } = require("https");

  const httpsOptions = {
    key: readFileSync("/etc/letsencrypt/live/at.insahr.co.kr/privkey.pem"),
    cert: readFileSync("/etc/letsencrypt/live/at.insahr.co.kr/cert.pem"),
  };

  app
    .prepare()
    .then(() => {
      createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(sslPort, (err) => {
        if (err) throw err;
        console.log(`> Ready on https: ${sslPort}`);
        console.log(
          `server Date : ${new Date()}, mode : ${process.env.NODE_ENV}`
        );
      });
    })
    .catch((e) => console.error(new Date(), e));
}
