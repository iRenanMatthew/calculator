let numbers = document.querySelectorAll(".bg-numbers");
let operators = document.querySelectorAll(".bg-operators");
let resultText = document.querySelector(".calculatorScreen");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");

let previousNum = "";
let currentNum = "";
let operateSymbol = null;
let resetNumber = false;

updateScreen("0");

function updateScreen(number) {
  resultText.textContent = number;
}

function buttonClick(e) {
  let id = e.target.innerHTML;
  if (isNaN(id) && id !== ".") {
    setOperator(id);
  } else {
    setNumber(id);
  }
  console.log(previousNum, operateSymbol, currentNum);
}

function setNumber(number) {
  if (resetNumber) {
    currentNum = "";
    resetNumber = false;
  }

  // Handle decimal points and prevent multiple decimals
  if (number === "." && currentNum.includes(".")) {
    return;
  }

  // Replace "0" with the new number or append if not starting with zero
  if (currentNum === "0" && number !== ".") {
    currentNum = number;
  } else {
    currentNum += number;
  }

  updateScreen(currentNum);
}

function setOperator(op) {
  let operations = ["+", "-", "x", "/", "%"];
  if (currentNum === "" && previousNum === "") {
    return;
  }

  if (op === "CLEAR") {
    clearCalculator();
  } else if (op === "DEL") {
    deleteLastDigit();
  } else if (op === "=") {
    if (operateSymbol && previousNum !== "" && currentNum !== "") {
      operateNumber();
      operateSymbol = null; // Reset operator after calculation
    }
  } else if (operations.includes(op)) {
    if (operateSymbol && !resetNumber) {
      operateNumber();
    }
    operateSymbol = op;
    previousNum = currentNum;
    resetNumber = true;
  }
}

function clearCalculator() {
  operateSymbol = "";
  previousNum = "";
  currentNum = "";
  updateScreen("0");
  resetNumber = false;
}

function deleteLastDigit() {
  currentNum = currentNum.length > 1 ? currentNum.slice(0, -1) : "0";
  updateScreen(currentNum);
}

function operateNumber() {
  let result = 0;
  let currentConvertedNum = Number(currentNum);
  let previousConvertedNum = Number(previousNum);

  switch (operateSymbol) {
    case "+":
      result = previousConvertedNum + currentConvertedNum;
      break;
    case "-":
      result = previousConvertedNum - currentConvertedNum;
      break;
    case "x":
      result = previousConvertedNum * currentConvertedNum;
      break;
    case "/":
      result =
        currentConvertedNum === 0
          ? "Error"
          : previousConvertedNum / currentConvertedNum;
      break;
    case "%":
      result =
        currentConvertedNum === 0
          ? "Error"
          : previousConvertedNum % currentConvertedNum;
      break;
    default:
      result = currentConvertedNum;
  }

  result =
    typeof result === "number" ? Math.round(result * 100000) / 100000 : result;
  previousNum = result.toString();
  currentNum = result.toString();
  resetNumber = true;
  updateScreen(result);
}

numbers.forEach((number) => {
  number.addEventListener("click", buttonClick);
});

operators.forEach((operator) => {
  operator.addEventListener("click", buttonClick);
});

equal.addEventListener("click", buttonClick);
clear.addEventListener("click", buttonClick);
del.addEventListener("click", buttonClick);
