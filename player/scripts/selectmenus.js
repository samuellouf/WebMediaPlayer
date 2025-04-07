// Select menus
function toggleSelect(select) {
  select.children[1].classList.toggle("hidden");
}

function selectOption(option, action = true) {
  var select = option.parentElement.parentElement;
  select.children[0].innerText = option.getAttribute("value");
  toggleSelect(select);
  if (option.hasAttribute("onselect") && action)
    eval(option.getAttribute("onselect"));
}

document.querySelectorAll(".selectmenu").forEach((e) => {
  e.children[0].setAttribute("onclick", "toggleSelect(this.parentElement);");
});

document.querySelectorAll(".selectmenu .options .option").forEach((e) => {
  e.setAttribute(
    "onclick",
    'selectOption(this); this.parentElement.parentElement.children[0].style.fontFamily = "' +
      e.getAttribute("value") +
      '";',
  );
});
