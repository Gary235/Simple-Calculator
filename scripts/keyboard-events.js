const keyListener = (e) => {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      document.querySelector(`#btn-${e.key}`).click();
      break;

    case "+":
      document.querySelector("#add").click();
      break;
    case "-":
      document.querySelector("#minus").click();
      break;
    case "*":
      document.querySelector("#multiplication").click();
      break;
    case "/":
      document.querySelector("#division").click();
      break;

    case "Enter":
      document.querySelector("#equals").click();
      break;
    case "c":
      document.querySelector("#clear").click();
      break;

    default:
      break;
  }
};

window.addEventListener("keypress", keyListener);
