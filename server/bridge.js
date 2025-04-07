// Utilities
function listArguments(func, returnDefaultArguments = false) {
  return String(func)
    .split(func.name + "(")[1]
    .split("){")[0]
    .split(",")
    .map((item) => {
      item = item.substring(item.startsWith(" ") ? 1 : 0);
      if (item.endsWith(" ")) item = item.substring(0, item.length - 1);
      if (!returnDefaultArguments) return item.split("=")[0];
      if (item.includes("=")) {
        var value = item.split("=").slice(1).join("=");
        value = value.startsWith(" ") ? value.substring(1) : value;
        value = value.endsWith(" ")
          ? value.substring(0, value.length - 1)
          : value;
        return { name: item.split("=")[0], value };
      }
      return item;
    });
}

async function tryToGet(func) {
  try {
    var r = await func();
    return r;
  } catch (e) {
    return null;
  }
}

// Functions
var initialized = false;
var senderFuncs = {};
var receiverFuncs = {};

function sendFunction(func, args) {
  if (!senderFuncs[func]) senderFuncs[func] = [];
  senderFuncs[func].push(args);
}

function addReceiverFunction(function_name, func, overwrite = true) {
  if (
    (receiverFuncs[function_name] && overwrite) ||
    !receiverFuncs[function_name]
  )
    receiverFuncs[function_name] = func;
}

function init(app) {
  initialized = true;

  app.get("/bridge/:func", async (req, res, next) => {
    res.contentType("text/json");
    const func = req.params.func;
    if (!senderFuncs[func]) {
      res.status(404);
      res.send({ success: false, errorCode: 404, error: "Function Not Found" });
      return;
    }
    if (!senderFuncs[func][0]) {
      res.status(204);
      res.send({ success: false, errorCode: 204, error: "No Content" });
      return;
    }
    res.status(200);
    res.send(senderFuncs[func][0]);
    senderFuncs[func] = senderFuncs[func].slice(1);
  });

  app.post("/bridge/:func", async (req, res, next) => {
    const func = req.params.func;
    res.contentType("application/json");
    const body = req.body;

    if (!receiverFuncs[func]) {
      res.status(404);
      res.send({ success: false, errorCode: 404, error: "Function Not Found" });
      return;
    }

    try {
      var response;
      response = await receiverFuncs[func](JSON.parse(body));

      res.status(200);
      res.send({ success: true, response });
    } catch {
      res.status(500);
      res.send({
        success: false,
        errorCode: 500,
        error: "Internal Server Error",
      });
      return;
    }
  });

  app.get("/bridge.js", async (req, res, next) => {
    res.contentType("text/javascript");
    res.send(`// Bridge API
// by: @samuellouf

window.bridge = {
  functions: [],
  funcs: [],
  initialized: false,
  init(){
    window.setInterval(bridge.checkUpdates, 250);
    bridge.initialized = true;
  },
  async addRecieverFunction(func, target){
    if (!bridge.initialized) return;
    bridge.functions.push({ func, target });
    if (!bridge.funcs.includes(func)) bridge.funcs.push(func);
  },
  async triggerFunction(func, args = null){
    if (!bridge.initialized) return;
    for (var func_ of bridge.functions){
      if (func_.func == func){
        if (!args) return func_.target();
        func_.target(args);
      }
    }
  },
  async sendFunction(func, args){
    if (!bridge.initialized) return;
    await fetch(\`/bridge/\${func}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    });
  },
  async checkUpdates(){
    if (!bridge.initialized) return;
    for (var func of bridge.funcs){
      var hasMoreData = true;
      while (hasMoreData){
        var response = await fetch(\`/bridge/\${func}\`);
        if (response.status == 204 || response.status == 404) hasMoreData = false;
        if (response.status == 200){
          await bridge.triggerFunction(func, await response.json());
        }
      }
    }
  },
}

bridge.init();
`);
  });
}

module.exports = {
  init,
  sendFunction,
  addReceiverFunction,
  initialized,
};
