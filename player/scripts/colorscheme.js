class ColorScheme {
  constructor() {
    this.schemes = ["system", "light", "dark", "orange", "red"];
    this.select = document.querySelector(
      "#settings-app .app .interface .color-scheme select",
    );
    this.loadSelect();
    if (saves.getData("color_scheme") == null) {
      saves.setData("color_scheme", "system");
    }
  }

  loadSelect() {
    for (var scheme of this.schemes) {
      var option = document.createElement("option");
      option.value = scheme;
      option.setAttribute("t_id", "settings/themes/" + scheme);
      option.innerHTML = scheme;
      this.select.appendChild(option);
    }
  }

  light() {
    document.getElementById("color_scheme").href = "themes/light.css";
    saves.setData("color_scheme", "light");
  }

  dark() {
    document.getElementById("color_scheme").href = "themes/dark.css";
    saves.setData("color_scheme", "dark");
  }

  change(scheme) {
    if (scheme == "system") {
      this.system();
    } else {
      document.getElementById("color_scheme").href =
        "themes/" + scheme + ".css";
    }
    saves.setData("color_scheme", scheme);
  }

  system() {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      this.light();
    } else {
      this.dark();
    }
  }

  load() {
    this.change(saves.getData("color_scheme"));
    document.querySelector(
      "#settings-app .app .interface .color-scheme select",
    ).value = saves.getData("color_scheme") || "light";
  }
}

const system_theme = () => {
  if (
    !(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  ) {
    return "light";
  } else {
    return "dark";
  }
};

// Load the Color Scheme
let color_scheme = new ColorScheme();
color_scheme.load();
