class Loader {
  #visible = false;
  constructor(
    visibility = false,
    div = document.querySelector("div.loading-page"),
  ) {
    this.div = div;
    this.visibility = visibility;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  set visible(visibility) {
    this.#visible = visibility;
    switch (visibility) {
      case true:
        this.div.classList.remove("hidden");
        break;
      case false:
        this.div.classList.add("hidden");
        break;
    }
  }

  get visible() {
    return this.#visible;
  }

  set text(text) {
    this.div.querySelector(".loadingFile").innerText = text;
  }

  get text() {
    return this.div.querySelector(".loadingFile").innerText;
  }

  set html(html) {
    this.div.querySelector(".loadingFile").innerHTML = html;
  }

  get html() {
    return this.div.querySelector(".loadingFile").innerHTML;
  }
}

let loader = new Loader(true);
