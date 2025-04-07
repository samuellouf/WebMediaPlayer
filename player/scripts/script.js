// Load the languages

function getQueryOfElement(element) {
  var elements = [];
  var e = null;
  elements.push(element);
  while (e != document.body) {
    elements.push(elements[elements.length - 1].parentElement);
    e = elements[elements.length - 1];
  }
  elements.reverse();

  var query = "";

  for (var i in elements) {
    query += elements[i].localName;

    if (elements[i].id != "") {
      query += "#" + elements[i].id;
    }

    if (elements[i].className != "") {
      if (elements[i].className.includes(" ")) {
        query += "." + elements[i].className.replaceAll(" ", ".");
      } else {
        query += "." + elements[i].className;
      }
    }

    if (elements.length - 1 != i) {
      query += " ";
    }
  }

  return query;
}

function getQueryAllOfElement(element) {
  let q = getQueryOfElement(element);
  let qall = [];

  for (var i = 0; i < document.querySelectorAll(q).length; i++) {
    qall.push(document.querySelectorAll(q)[i]);
  }

  return { query: q, index: qall.indexOf(element) };
}

function toggleSubtitlesMenu() {
  document.querySelector(".cc-menu").classList.remove("hidden");
  const removeCCMenu = (e) => {
    if (!getQueryOfElement(e.target).includes(".cc-menu")) {
      document.querySelector(".cc-menu").classList.add("hidden");
      document.removeEventListener("click", removeCCMenu);
    }
  };
  document.addEventListener("click", removeCCMenu);
}
// Add these functions to your existing JavaScript
function toggleSpeedMenu() {
  const speedDropdown = document.getElementById("speedDropdown");
  speedDropdown.classList.toggle("hidden");
}

function showSpeedMenu() {
  document.querySelector(".speed-dropdown").classList.remove("hidden");
  const removeSMenu = (e) => {
    if (
      e.type == "click" &&
      !getQueryOfElement(e.target).includes(".speed-menu")
    ) {
      document.querySelector(".speed-dropdown").classList.add("hidden");
      document.removeEventListener("mousemove", removeSMenu);
      document.removeEventListener("click", removeSMenu);
    }

    if (!getQueryOfElement(e.target).includes(".controls")) {
      document.querySelector(".speed-dropdown").classList.add("hidden");
      document.removeEventListener("mousemove", removeSMenu);
      document.removeEventListener("click", removeSMenu);
    }
  };
  document.addEventListener("mousemove", removeSMenu);
  document.addEventListener("click", removeSMenu);
}

// Create the Apps
windows.turnIntoApp("#settings-app");

ui_translator.loadDialogs();

let params = new URLSearchParams(window.location.search);
if (params.get("url") != null) {
  viewer.openNetworkFlux(params.get("url"));
}

if ((params.get("lyrics") || params.get("subtitles")) != null) {
  viewer.loadLyricsFileFromURL(params.get("lyrics") || params.get("subtitles"));
}

if (params.get("mode") != null) {
  viewer.mode = params.get("mode");
}

document.querySelector(
  "app#settings-app.appwindow section.ui div.app .interface div.language select",
).value = ui_translator.getSelectedLanguage();

function reloadMenus() {
  defineMenus();
  window.video_menu = new ContextMenu(videoMenu);
  window.image_menu = new ContextMenu(imageMenu);
  window.audio_menu = new ContextMenu(audioMenu);

  window.cm = function (e) {
    if (viewer.mode === "iframe") return;
    window[viewer.mode + "_menu"].display(e);
  };

  document
    .querySelector("div.viewer")
    .addEventListener("contextmenu", window.cm);
  document
    .querySelector("div.viewer div.players")
    .addEventListener("contextmenu", window.cm);
  document
    .querySelector("div.viewer div.players video")
    .addEventListener("contextmenu", function (e) {
      video_menu.display(e);
    });
  document
    .querySelector("div.viewer div.players img")
    .addEventListener("contextmenu", function (e) {
      image_menu.display(e);
    });
  document
    .querySelector("div.viewer div.players div.audio")
    .addEventListener("contextmenu", function (e) {
      audio_menu.display(e);
    });
  ui_translator.loadDialogs();
}

reloadMenus();

try {
  viewer.reloadMenus = reloadMenus;
  viewer.videoElement.audioTracks.onaddtrack = reloadMenus;
  viewer.videoElement.audioTracks.onremovetrack = reloadMenus;
  viewer.videoElement.audioTracks.onchange = reloadMenus;
} catch (e) {}

document.querySelector(".cc-menu input.visible").checked =
  saves.getData("subtitles_visible");
document.querySelector(
  "app#settings-app .ui .video input.subtitlesvisible",
).checked = saves.getData("subtitles_visible");

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and contents
      tabs.forEach((tab) => tab.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active");
      const activeContent = document.querySelector(
        '[target-id="' + tab.getAttribute("data-tab") + '"]',
      );
      activeContent.classList.add("active");
    });
  });

  if (window.navigator.userAgent.includes("Mac OS X")) {
    document.querySelector(".viewer .controls .tracks-btns").style.display =
      "none";
  }
});

function exitFullscreen() {
  viewer.exitFullscreen();
}

function refreshServiceWorker() {
  window.location.reload();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    return new Promise((resolve) => {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("serviceWorker.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope,
            );
            resolve(true);
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
            resolve(false);
          });
      });
    });
  }
  return false;
}

function main() {
  loader.text = ui_translator.getDialogInLanguage("loading_page");
  loader.show();
  document.addEventListener("DOMContentLoaded", async () => {
    /* if (saves.getData('download_in_cache') == undefined){
      saves.setData('download_in_cache', true);
    }
  
    document.querySelector('input.downloadincache').checked = saves.getData('download_in_cache'); */

    loader.text = ui_translator.getDialogInLanguage("loading_service_worker");
    await registerServiceWorker();
    loader.hide();
  });
}

main();
