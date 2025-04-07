class Utils_ {
  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getPromiseFromEvent(item, event) {
    return new Promise((resolve) => {
      const listener = (e) => {
        item.removeEventListener(event, listener);
        resolve(e);
      };
      item.addEventListener(event, listener);
    });
  }

  s2hms = (s, responseType = "string", rounded = false) => {
    var duration = {
      h: String(s / 3600).includes(".")
        ? Number(String(s / 3600).split(".")[0])
        : s / 3600,
    };
    duration.m = String((s - duration.h * 3600) / 60).includes(".")
      ? Number(String((s - duration.h * 3600) / 60).split(".")[0])
      : (s - duration.h * 3600) / 60;
    duration.s = String(s - duration.h * 3600 - duration.m * 60).includes(".")
      ? Number(String(s - duration.h * 3600 - duration.m * 60).split(".")[0])
      : s - duration.h * 3600 - duration.m * 60;
    if (rounded) duration.s = Math.round(duration.s);
    var { h, m, s_ } = { h: duration.h, m: duration.m, s_: duration.s };
    if (responseType == "string") {
      return (
        (String(h).length == 0 ? "00" : String(h).length == 1 ? "0" : "") +
        String(h) +
        ":" +
        (String(m).length == 0 ? "00" : String(m).length == 1 ? "0" : "") +
        String(m) +
        ":" +
        (String(s_).includes(".")
          ? String(s_).split(".")[0].length == 1
            ? "0"
            : ""
          : String(s_).length == 1
            ? "0"
            : "") +
        String(s_)
      );
    } else if (responseType == "json") {
      return duration;
    } else {
      throw Error("Invalid response type");
    }
  };

  delay = (s) => new Promise((res) => setTimeout(res, s * 1000));

  getBrowserName() {
    var browser = (function (agent) {
      switch (true) {
        case agent.indexOf("edge") > -1:
          return "edge";
        case agent.indexOf("edg") > -1:
          return "chromium based edge (dev or canary)";
        case agent.indexOf("opr") > -1 && !!window.opr:
          return "opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome:
          return "chrome";
        case agent.indexOf("trident") > -1:
          return "ie";
        case agent.indexOf("firefox") > -1:
          return "firefox";
        case agent.indexOf("safari") > -1:
          return "safari";
        default:
          return "other";
      }
    })(window.navigator.userAgent.toLowerCase());
    return browser;
  }
}

let utils = new Utils_();
