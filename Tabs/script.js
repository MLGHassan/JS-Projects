// Source - https://stackoverflow.com/a/46179471
// Posted by adeneo
// Retrieved 2026-05-27, License - CC BY-SA 3.0


function writeTab(element) {
  var display = document.getElementById("display");
  display.textContent = "This div is showing the text of Tab 2";

  if (element.innerHTML === "Tab 1") {
      display.textContent = "This div is showing the text of Tab 1";
  }
  else if (element.innerHTML === "Tab 2") {
    display.textContent = "This div is showing the text of Tab 2";
  }
  else if (element.innerHTML === "Tab 3") {
    display.textContent = "This div is showing the text of Tab 3";
  }
  else if (element.innerHTML === "Tab 4") {
    display.textContent = "This div is showing the text of Tab 4";
  }
}

