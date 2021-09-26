const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");

const display = document.querySelector("#display-txt");
const history = document.querySelector(".history");

const clear = document.querySelector("#clear");
const erase = document.querySelector("#individual-erase");
const equalsBtn = document.querySelector("#equals");

const historyOfEcuations = window.localStorage.getItem("history_of_ecuations");
const ecuationsParsed = historyOfEcuations
  ? JSON.parse(historyOfEcuations)
  : [];

(() => {
  if (ecuationsParsed) {
    ecuationsParsed.forEach((ecuation) => {
      const historyElement = document.createElement("li");
      historyElement.innerHTML = `
        <div class="history-item">
          <p class="history-ecuation">${ecuation.ecuation}</p> <strong class="history-result">${ecuation.result}</strong>
        </div>
        `;
      history.appendChild(historyElement);
    });
  }
})();

const checkDisplay = () => {
  if (display.innerHTML.length >= 9) {
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
    if (display.innerHTML === "0")
      display.innerHTML = e.target.id.split("-")[1];
    else display.innerHTML += e.target.id.split("-")[1];
  }

  checkDisplay();
};

const onClickOperation = (e) => {
  if (e.target.tagName === "BUTTON") {
    display.innerHTML +=
      e.target.id !== "comma" ? ` ${e.target.innerHTML} ` : ".";
  }

  checkDisplay();
};

const onClear = () => {
  display.innerHTML = "0";
  checkDisplay();
};

const onErase = () => {
  if (display.innerHTML.length === 1) {
    display.innerHTML = "0";
  } else {
    const displayValue = display.innerHTML.split("");
    displayValue.pop();
    display.innerHTML = displayValue.join("");
  }
};

const onClickEquals = () => {
  try {
    const ecuation = display.innerHTML;
    const result = eval(ecuation);

    if (ecuation.match(/[+\-*/]/g)) {
      addToHistory({
        ecuation,
        result: result.toString().includes(".") ? result.toFixed(2) : result,
      });

      display.innerHTML = result;
    }
  } catch (error) {
    display.innerHTML = error.message;
  }
};

const addToHistory = (item) => {
  ecuationsParsed.push(item);
  window.localStorage.setItem(
    "history_of_ecuations",
    JSON.stringify(ecuationsParsed)
  );

  const historyElement = document.createElement("li");
  historyElement.innerHTML = `
    <div class="history-item">
      <p class="history-ecuation">${item.ecuation}</p> <strong class="history-result">${item.result}</strong>
    </div>
    `;

  history.appendChild(historyElement);
};

numbers.addEventListener("click", onClickNumber);
operations.addEventListener("click", onClickOperation);

clear.addEventListener("click", onClear);
erase.addEventListener("click", onErase);
equalsBtn.addEventListener("click", onClickEquals);
