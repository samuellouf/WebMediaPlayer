class AppWindow {
  turnIntoApp(elmnt) {
    this.dragElement(elmnt);
    this.closeApp(elmnt);
    document.querySelector(elmnt).style.width = "720px";
    document.querySelector(elmnt).style.height = "500px";
    document.querySelector(elmnt + " section.ui").style.height = "440px";
  }

  closeApp(elmnt) {
    document.querySelector(elmnt).style.display = "none";
    document.querySelectorAll(elmnt + " video").forEach((element) => {
      element.pause();
    });
    document.querySelectorAll(elmnt + " audio").forEach((element) => {
      element.pause();
    });
  }

  openApp(elmnt) {
    document.querySelector(elmnt).style.display = "";
    document.querySelector(elmnt).style.top = "50%";
    document.querySelector(elmnt).style.left = "50%";
  }

  setAppTitle(elmnt, title) {
    document.querySelector(
      elmnt + " div.appwindowheader span.app-title",
    ).innerText = title;
  }

  fullscreenOnApp(elmnt) {
    var elmnt_query = elmnt;
    elmnt = document.querySelector(elmnt);
    elmnt.style.transitionDuration = "0.2s";
    elmnt.style.top = "50%";
    elmnt.style.left = "50%";
    elmnt.style.width = "100%";
    elmnt.style.height = "100%";
    elmnt.style.borderRadius = "0px";
    document.querySelector(
      elmnt_query + " .appwindowheader",
    ).style.borderRadius = "0px";
    document.querySelector(elmnt_query + " section.ui").style.height = "100%";
    document
      .querySelectorAll(elmnt_query + " div.resizer")
      .forEach((element) => {
        element.style.display = "none";
      });
  }

  async fullscreenOffApp(elmnt) {
    var elmnt_query = elmnt;
    elmnt = document.querySelector(elmnt);
    elmnt.style.top = elmnt.getAttribute("previous-top");
    elmnt.style.left = elmnt.getAttribute("previous-left");
    elmnt.style.width = elmnt.getAttribute("origin-width");
    elmnt.style.height = elmnt.getAttribute("origin-height");
    elmnt.style.borderRadius = "10px";
    document.querySelector(
      elmnt_query + " .appwindowheader",
    ).style.borderRadius = "10px 10px 0px 0px";
    document.querySelector(elmnt_query + " .ui").style.height = document
      .querySelector(elmnt_query + " .ui")
      .getAttribute("previous-height");
    document
      .querySelectorAll(elmnt_query + " div.resizer")
      .forEach((element) => {
        element.style.display = "";
      });
    await utils.delay(0.25);
    elmnt.style.transitionDuration = "";
  }

  toggleAppVisibility(elmnt) {
    if (document.querySelector(elmnt).style.display == "") {
      this.closeApp(elmnt);
    } else {
      this.openApp(elmnt);
    }
  }

  toggleAppFullscreen(elmnt) {
    if (document.querySelector(elmnt).style.width == "100%") {
      this.fullscreenOffApp(elmnt);
    } else {
      this.fullscreenOnApp(elmnt);
    }
  }

  resizeHorizontal(elmnt, direction) {
    var e = window.event;
    var mouseX = e.clientX;
    elmnt = document.querySelector(elmnt);
    var elmnt_width = elmnt.style.width;
    var elmnt_left = elmnt.style.left;

    document.onmousemove = (e) => {
      e.preventDefault();
      if (elmnt.style.left.includes("%")) {
        elmnt.style.left =
          window.innerWidth /
            (100 / Number(elmnt.style.left.replace("%", ""))) +
          "px";
      }

      if (elmnt.style.top.includes("%")) {
        elmnt.style.top =
          window.innerHeight /
            (100 / Number(elmnt.style.top.replace("%", ""))) +
          "px";
      }

      if (direction == "right") {
        var width =
          Number(elmnt_width.replace("px", "")) - (mouseX - e.clientX);
      } else {
        var width =
          Number(elmnt_width.replace("px", "")) + (mouseX - e.clientX);
      }

      console.log(width + "px");

      if (width >= Number(elmnt.getAttribute("min-width"))) {
        if (direction == "right") {
          elmnt.style.left =
            Number(elmnt_left.replace("px", "")) -
            (mouseX - e.clientX) / 2 +
            "px";
        } else {
          elmnt.style.left =
            Number(elmnt_left.replace("px", "")) -
            (mouseX - e.clientX) / 2 +
            "px";
        }
        elmnt.style.width = width + "px";
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  resizeVertical(elmnt) {
    var e = window.event;
    var mouseY = e.clientY;
    var elmnt_query = elmnt;
    elmnt = document.querySelector(elmnt);
    var elmnt_height = elmnt.style.height;
    var elmnt_top = elmnt.style.top;

    document.onmousemove = (e) => {
      e.preventDefault();

      /* if (elmnt.style.left.includes('%')){
        elmnt.style.left = (window.innerWidth / (100 / Number(elmnt.style.left.replace('%', '')))) + 'px';
      }

      if (elmnt.style.top.includes('%')){
        elmnt.style.top = (window.innerHeight / (100 / Number(elmnt.style.top.replace('%', '')))) + 'px';
      } */

      var height =
        Number(elmnt_height.replace("px", "")) - (mouseY - e.clientY);

      console.log(height + "px");

      if (height >= Number(elmnt.getAttribute("min-height"))) {
        elmnt.style.top =
          Number(elmnt_top.replace("px", "")) - (mouseY - e.clientY) / 2 + "px";
        elmnt.style.height = height + "px";
        document
          .querySelector(elmnt_query + " section.ui")
          .setAttribute("height", elmnt.clientHeight - 60 + "px");
        document.querySelector(elmnt_query + " section.ui").style.height =
          elmnt.clientHeight - 60 + "px";
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  dragElement(elmnt) {
    var elmnt_query = elmnt;
    elmnt = document.querySelector(elmnt);
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.setAttribute("origin-width", elmnt.style.width);
    elmnt.setAttribute("origin-height", elmnt.style.height);

    if (document.querySelector(elmnt_query + " .appwindowheader")) {
      /* if present, the header is where you move the DIV from:*/
      document.querySelector(elmnt_query + " .appwindowheader").onmousedown =
        dragMouseDown;
      document.querySelector(elmnt_query + " .appwindowheader").ondblclick =
        function () {
          toggleAppFullscreen(elmnt_query);
        };
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
      elmnt.ondblclick = function () {
        toggleAppFullscreen(elmnt_query);
      };
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function fullscreenOnApp(elmnt) {
      var elmnt_query = elmnt;
      elmnt = document.querySelector(elmnt);
      elmnt.style.transitionDuration = "0.2s";
      elmnt.style.top = "50%";
      elmnt.style.left = "50%";
      elmnt.style.width = "100%";
      elmnt.style.height = "100%";
      elmnt.style.borderRadius = "0px";
      document.querySelector(
        elmnt_query + " .appwindowheader",
      ).style.borderRadius = "0px";
      if (
        document.querySelector(elmnt_query + " .ui").style.height !=
        (utils.getBrowserName() === "firefox"
          ? "-moz-available"
          : "-webkit-fill-available")
      ) {
        document
          .querySelector(elmnt_query + " .ui")
          .setAttribute(
            "previous-height",
            document.querySelector(elmnt_query + " .ui").style.height,
          );
      }
      document.querySelector(elmnt_query + " .ui").style.height =
        utils.getBrowserName() === "firefox"
          ? "-moz-available"
          : "-webkit-fill-available";
      document
        .querySelectorAll(elmnt_query + " div.resizer")
        .forEach((element) => {
          element.style.display = "none";
        });
    }

    async function fullscreenOffApp(elmnt) {
      var elmnt_query = elmnt;
      elmnt = document.querySelector(elmnt);
      elmnt.style.top = elmnt.getAttribute("previous-top");
      elmnt.style.left = elmnt.getAttribute("previous-left");
      elmnt.style.width = elmnt.getAttribute("origin-width");
      elmnt.style.height = elmnt.getAttribute("origin-height");
      elmnt.style.borderRadius = "10px";
      document.querySelector(elmnt_query + " .ui").style.height = document
        .querySelector(elmnt_query + " .ui")
        .getAttribute("previous-height");
      document.querySelector(
        elmnt_query + " .appwindowheader",
      ).style.borderRadius = "10px 10px 0px 0px";
      document
        .querySelectorAll(elmnt_query + " div.resizer")
        .forEach((element) => {
          element.style.display = "";
        });
      await utils.delay(0.25);
      elmnt.style.transitionDuration = "";
    }

    function toggleAppFullscreen(elmnt) {
      if (document.querySelector(elmnt).style.width == "100%") {
        fullscreenOffApp(elmnt);
      } else {
        fullscreenOnApp(elmnt);
      }
    }

    async function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if (e.clientY < 20) {
        fullscreenOnApp(elmnt_query);
      } else {
        if (elmnt.style.width == "100%") {
          elmnt.style.width = elmnt.getAttribute("origin-width");
          elmnt.style.height = elmnt.getAttribute("origin-height");
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        } else {
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        elmnt.setAttribute("previous-top", elmnt.style.top);
        elmnt.setAttribute("previous-left", elmnt.style.left);
        elmnt.style.borderRadius = "10px";
        document.querySelector(elmnt_query + " .ui").style.height = document
          .querySelector(elmnt_query + " .ui")
          .getAttribute("previous-height");
        document.querySelector(
          elmnt_query + " .appwindowheader",
        ).style.borderRadius = "10px 10px 0px 0px";
        await utils.delay(0.25);
        elmnt.style.transitionDuration = "";
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

let windows = new AppWindow();
