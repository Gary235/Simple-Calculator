const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");

const display = document.querySelector("#display-txt");
const clear = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

const checkDisplay = () => {
  if (display.innerHTML.length >= 10) {
    display.style.fontSize = "1em";
  } else {
    display.style.fontSize = "2.5em";
  }

  if (display.innerHTML.length >= 25) {
    display.innerHTML += "\n";
  }
};

const onClickNumber = (e) => {
  if (e.target.tagName === "BUTTON" && e.target.id !== "equals") {
    if (display.innerHTML === "0") display.innerHTML = e.target.id;
    else display.innerHTML += e.target.id;
  }

  checkDisplay();
};

const onClickOperation = (e) => {
  if (e.target.tagName === "BUTTON") {
    display.innerHTML += ` ${e.target.innerHTML} `;
  }

  checkDisplay();
};

const onClear = () => {
  display.innerHTML = "0";
  checkDisplay();
};

const onClickEquals = () => {
  try {
    display.innerHTML = eval(display.innerHTML);
  } catch (error) {
    display.innerHTML = error.message;
  }
};

numbers.addEventListener("click", onClickNumber);
operations.addEventListener("click", onClickOperation);

clear.addEventListener("click", onClear);
equalsBtn.addEventListener("click", onClickEquals);
