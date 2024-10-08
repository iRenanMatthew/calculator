let numbers = document.querySelectorAll(".bg-numbers");
let operators = document.querySelectorAll(".bg-operators");
let resultText = document.querySelector(".calculatorScreen");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");

let previousNum = "",
  currentNum = "";
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

  // Prevent appending if currentNum is "0"
  if (currentNum === "0" && number === "0") {
    return;
  }

  // Replace "0" with the new number if first number is "0"
  if (currentNum === "0") {
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
  } else if (op === "CLEAR") {
    operateSymbol = "";
    previousNum = "";
    currentNum = "";
    updateScreen("0");
    return (resetNumber = false);
  } else if (op === "DEL") {
    let str = resultText.textContent;
    let deletedNum;
    if (str.length > 1) {
      deletedNum = str
        .split("")
        .slice(0, str.length - 1)
        .join("");
    } else {
      deletedNum = "0";
    }
    currentNum = deletedNum;
    updateScreen(deletedNum);
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

function operateNumber() {
  let result = "";
  let currentConvertedNum = Number(currentNum);
  let previousConvertedNum = Number(previousNum);

  if (operateSymbol === "+") {
    result = previousConvertedNum + currentConvertedNum;
  } else if (operateSymbol === "-") {
    result = previousConvertedNum - currentConvertedNum;
  } else if (operateSymbol === "x") {
    result = previousConvertedNum * currentConvertedNum;
  } else if (operateSymbol === "/") {
    result = previousConvertedNum / currentConvertedNum;
  } else if (operateSymbol === "%") {
    result = previousConvertedNum % currentConvertedNum;
  }

  result = Math.round(result * 100000) / 100000;
  previousNum = result.toString();
  currentNum = result.toString(); // Ensure currentNum reflects the result
  resetNumber = true;
  updateScreen(result);
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

equal.addEventListener("click", (e) => {
  buttonClick(e);
});

clear.addEventListener("click", (e) => {
  buttonClick(e);
});

del.addEventListener("click", (e) => {
  buttonClick(e);
});
