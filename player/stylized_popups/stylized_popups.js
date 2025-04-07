class StylizedPopups {
  constructor(theme) {
    this.style = document.createElement("style");
    document.head.appendChild(this.style);

    let div = document.createElement("div");
    div.id = "stylized_popups";
    div.innerHTML = `
    <div class="popup alert hidden">
      <h3>Title</h3>
      <p>subtitle</p>
      <div class="buttons">
        <button class="confirm">OK</button>
      </div>
    </div>
    <div class="popup confirm hidden">
      <h3>Title</h3>
      <p>subtitle</p>
      <div class="buttons">
        <button class="confirm">OK</button>
        <button class="cancel">Cancel</button>
      </div>
    </div>
    <div class="popup prompt hidden">
      <h3>Title</h3>
      <p>subtitle</p>
      <input type="text" name="prompt-input">
      <div class="buttons">
        <button class="confirm">Confirm</button>
        <button class="cancel">Cancel</button>
      </div>
    </div>`;
    document.body.appendChild(div);

    this.alert_div = document.querySelector("#stylized_popups .popup.alert");
    this.confirm_div = document.querySelector(
      "#stylized_popups .popup.confirm",
    );
    this.prompt_div = document.querySelector("#stylized_popups .popup.prompt");

    this.themes = {
      light: {
        text: "black",
        background: "white",
        placeholder: "#bcbcbc",
        highlight: "#2b6195",
        secondary_highlight: "#9ecaff",
      },
    };

    this.selectedTheme = null;

    watchFunction(
      () => this.selectedTheme,
      (event) => {
        this.style.innerText = `:root{\n  --stylized-popups-color: ${this.themes[this.selectedTheme].text};\n  --stylized-popups-background-color: ${this.themes[this.selectedTheme].background};\n  --stylized-popups-input-placeholder-color: ${this.themes[this.selectedTheme].placeholder};\n  --stylized-popups-highlight: ${this.themes[this.selectedTheme].highlight};\n  --stylized-popups-secondary-highlight: ${this.themes[this.selectedTheme].secondary_highlight};\n}`;
      },
    );

    this.selectedTheme = theme || "light";
  }

  selectTheme(name) {
    if (this.themes[name]) {
      this.selectedTheme = name;
    } else {
      throw Error(`The theme "${name}" doesn't exists.`);
    }
  }

  alert(title, subtitle = "") {
    return new Promise((resolve) => {
      this.alert_div.classList.remove("hidden");
      document.querySelector("#stylized_popups .popup.alert h3").innerText =
        title;
      document.querySelector("#stylized_popups .popup.alert p").innerText =
        subtitle;
      document
        .querySelector("#stylized_popups .popup.alert .buttons button")
        .addEventListener("click", () => {
          resolve();
          document
            .querySelector("#stylized_popups .popup.alert")
            .classList.add("hidden");
        });
    });
  }

  confirm(title, subtitle = "") {
    return new Promise((resolve) => {
      this.confirm_div.classList.remove("hidden");
      document.querySelector("#stylized_popups .popup.confirm h3").innerText =
        title;
      document.querySelector("#stylized_popups .popup.confirm p").innerText =
        subtitle;
      document
        .querySelector(
          "#stylized_popups .popup.confirm .buttons button.confirm",
        )
        .addEventListener("click", () => {
          document
            .querySelector("#stylized_popups .popup.confirm")
            .classList.add("hidden");
          resolve(true);
        });
      document
        .querySelector("#stylized_popups .popup.confirm .buttons button.cancel")
        .addEventListener("click", () => {
          resolve(false);
          document
            .querySelector("#stylized_popups .popup.confirm")
            .classList.add("hidden");
        });
    });
  }

  prompt(title, subtitle = "", placeholder = "", value = "", type = "text") {
    return new Promise((resolve) => {
      this.prompt_div.classList.remove("hidden");
      document.querySelector("#stylized_popups .popup.prompt h3").innerText =
        title;
      document.querySelector("#stylized_popups .popup.prompt p").innerText =
        subtitle;
      document
        .querySelector("#stylized_popups .popup.prompt input")
        .setAttribute("placeholder", placeholder);
      document.querySelector("#stylized_popups .popup.prompt input").value =
        value;
      document
        .querySelector("#stylized_popups .popup.prompt input")
        .setAttribute("type", type);
      document
        .querySelector("#stylized_popups .popup.prompt .buttons button.confirm")
        .addEventListener("click", () => {
          resolve(
            document.querySelector("#stylized_popups .popup.prompt input")
              .value,
          );
          document
            .querySelector("#stylized_popups .popup.prompt")
            .classList.add("hidden");
        });
      document
        .querySelector("#stylized_popups .popup.prompt .buttons button.cancel")
        .addEventListener("click", () => {
          resolve(null);
          document
            .querySelector("#stylized_popups .popup.prompt")
            .classList.add("hidden");
        });
    });
  }
}

let popups = new StylizedPopups();
