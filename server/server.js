const express = require("express");
const Builder = require("./builder");
const bodyParser = require("body-parser");
const bridge = require("./bridge");
const update = require("../update");
const utils = require("../utils");
const fs = require("fs");

var PORT = null,
  app = null,
  builder = null,
  mostRecentBuild = null,
  isServerOn = false;

function sendTemplate(response, page, ...incrustations) {
  response.contentType("text/html");
  page = fs.readFileSync(page, { encoding: "utf-8" });
  var computedPage = page;
  for (var incrustation of incrustations) {
    computedPage = computedPage.replace("[{INCRUSTRATION}]", incrustation);
  }
  response.send(computedPage);
}

async function startServer() {
  PORT = await utils.getOpenPort("localhost", 2000);

  mostRecentBuild = null;
  builder = new Builder();
  builder.startWatcher((newBuild) => {
    mostRecentBuild = newBuild;
  });

  app = express();
  app.use(bodyParser.json());
  app.set("strict routing", true);
  app.set("x-powered-by", false);

  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self' blob:; script-src blob: data: 'self' 'unsafe-inline' 'unsafe-eval' https://samuellouf.github.io *; style-src 'self' 'unsafe-inline' *; img-src 'self' data: blob: *; connect-src 'self' https://samuellouf.github.io blob: *; media-src 'self' blob: *; frame-src *",
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  bridge.init(app);

  app.get("/*", (req, res, next) => {
    if (!mostRecentBuild) {
      res.contentType("text/plain");
      res.status(500);
      res.send("Build Failed; See Console");
      return;
    }

    const fileInBuild = mostRecentBuild.getFile(decodeURIComponent(req.path));
    if (!fileInBuild) {
      return next();
    }

    res.contentType(fileInBuild.getType());
    res.send(fileInBuild.read());
  });

  app.get("/api/getLastestVersion", async (req, res) => {
    res.contentType("application/json");
    res.send({
      version:
        (await fetch("https://samuellouf.github.io/WebMediaPlayer/package.json")
          .then((r) => r.json())
          .then((r) => r.version)
          .catch((err) => null)) ||
        (await fetch("https://samuellouf.github.io/WebMediaPlayer/updates.json")
          .then((r) => r.json())
          .then((r) => r.lastest_version)
          .catch((err) => null)),
    });
  });

  bridge.addReceiverFunction("update", async (args) => {
    return await update.updateToVersion(args.version, true, {
      log: (message) => {
        console.log(message);
        bridge.sendFunction("updateLogger", { message, type: "log" });
      },
      warn: (message) => {
        console.warn(message);
        bridge.sendFunction("updateLogger", { message, type: "warn" });
      },
      error: (message) => {
        console.error(message);
        bridge.sendFunction("updateLogger", { message, type: "error" });
      },
    });
  });

  app.use((req, res) => {
    res.status(404);
    sendTemplate(res, "./server/404.html", req.url, `http://localhost:${PORT}`);
    console.error("404 Not Found:", req.path);
  });

  app.listen(PORT, () => {
    isServerOn = true;
    console.log(`Development server is ready on http://localhost:${PORT}/`);
  });
}

module.exports = {
  PORT,
  app,
  builder,
  mostRecentBuild,
  startServer,
  isServerOn,
};

if (require.main === module) {
  startServer();
}
