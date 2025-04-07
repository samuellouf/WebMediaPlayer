function isLocalServer() {
  return window.location.hostname == "localhost";
}

function hasBridge() {
  try {
    if (brige) {
      return true;
    }
  } catch (err) {}
  return false;
}

async function getLastestVersion() {
  return await fetch("/api/getLastestVersion")
    .then((r) => r.json())
    .then((r) => r.version)
    .catch((err) => null);
}

async function isUpdateAvailable() {
  if (!(hasBridge() && isLocalServer())) return false;
  var current_version = await fetch("../../package.json")
    .then((r) => r.json())
    .then((r) => r.version)
    .catch((err) =>
      fetch("../../updates.json")
        .then((r) => r.json())
        .then((r) => r.lastest_version)
        .catch((err) => "Infinity"),
    );
  var lastest_version = await getLastestVersion();
  return compareVersions(current_version, lastest_version) == -1;
}

function compareVersions(v1, v2) {
  if (!(v1 && v2)) return 0;
  const compare = (item1, item2) =>
    item1 == item2 ? 0 : item1 < item2 ? -1 : 1;
  return (
    compare(
      Number(v1.split(".").slice(0, 2).join(".")),
      Number(v2.split(".").slice(0, 2).join(".")),
    ) ||
    compare(
      Number(v1.split(".").slice(1, 3).join(".")),
      Number(v2.split(".").slice(0, 3).join(".")),
    )
  );
}

async function update(version = null) {
  if (!version) version = await getLastestVersion();
  if (bridge) {
    return await bridge.sendFunction("update", { version });
  }
  return false;
}

windows.turnIntoApp("#update-app");
window.onload = async () => {
  let logger = document.getElementById("updatelog");

  function log(message, type) {
    let messageElement = document.createElement("span");
    messageElement.classList.add("log-message");
    messageElement.innerText = message;
    messageElement.classList.add(type);
    logger.appendChild(messageElement);
  }

  document.querySelector("#update-app button.update").disabled =
    !(await isUpdateAvailable());
  document
    .querySelector("#update-app button.update")
    .addEventListener("click", async () => {
      document
        .querySelector("#update-app .loading-spinner")
        .classList.remove("hidden");
      bridge.addRecieverFunction("updateLogger", (args) => {
        log(args.message, args.type);
        if (args.type == "log") console.log(args.message);
        if (args.type == "warn") console.warn(args.message);
        if (args.type == "error") console.error(args.message);
      });
      logger.innerHTML = "";
      var success = await update();
      document
        .querySelector("#update-app .loading-spinner")
        .classList.add("hidden");
      if (success) {
        alert("Successfully updated WebMediaPlayer");
        if (confirm("Do you want to restart WebMediaPlayer?")) {
          window.location.reload();
        }
      } else {
        alert("Could not update WebMediaPlayer");
      }
    });
};
