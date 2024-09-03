let numbers = document.querySelectorAll(".bg-numbers");
let operators = document.querySelectorAll(".bg-operators");
let resultText = document.querySelector(".calculatorScreen");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");

let runningTotal = 0;
let buffer = "0";
let previousOperator;

resultText.textContent = buffer;

function buttonClick(e) {
  let storeChar = e.target.innerText;

  // If Not a Number Triggered like operators
  if (isNaN(storeChar)) {
    operateSymbol(storeChar);
  } else {
    operateNumber(storeChar);
  }
  // console.log(typeof buffer, buffer);
  resultText.textContent = buffer;
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    buttonClick(e);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    buttonClick(e);
  });
});

function operateNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function operateSymbol(operator) {
  let operations = ["+", "-", "x", "/", "%"];
  if (operator === "CLEAR") {
    buffer = "0";
    previousOperator = null;
    return (runningTotal = 0);
  } else if (operator === "=") {
    if (!previousOperator) {
      return;
    } else {
      computeNumber(Number(buffer));
      return (previousOperator = null);
    }
  } else if (operations.includes(operator)) {
    console.log(operator);
  }
}

function computeNumber(num) {
  console.log(num);
}

equal.addEventListener("click", (e) => {
  buttonClick(e);
});

clear.addEventListener("click", (e) => {
  buttonClick(e);
});

del.addEventListener("click", (e) => {
  buttonClick(e);
});
