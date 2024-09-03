let numbers = document.querySelectorAll(".bg-numbers");
let operators = document.querySelectorAll(".bg-operators");
let resultText = document.querySelector(".calculatorScreen");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let value, total;
let valueArr = [
  {
    oldValue: "",
    operator: "",
    currentValue: "",
  },
];
let flagNumber = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    resultText.textContent += e.target.innerText;
    value = resultText.textContent;
    console.log(value);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (e.target.classList.contains("modulo")) {
      console.log("squareroot");
    } else if (e.target.classList.contains("divide")) {
      divideNumber();
    } else if (e.target.classList.contains("multiply")) {
      multiplyNumber();
    } else if (e.target.classList.contains("subtract")) {
      subtractNumber();
    } else if (e.target.classList.contains("add")) {
      addNumber();
    }
  });
});

function storeNumber() {
  // Check if the currentValue is empty (i.e., no second number has been entered)
  if (flagNumber && value === "") {
    return; // Do not proceed with the operation
  }

  resultText.textContent = "";
  if (!flagNumber) {
    valueArr.oldValue = value;
    flagNumber = true;
  } else {
    valueArr.currentValue = value;
    operateNumber();
  }
}

function addNumber() {
  storeNumber();
  valueArr.operator = "add";
}

function subtractNumber() {
  storeNumber();
  valueArr.operator = "subtract";
}

function multiplyNumber() {
  storeNumber();
  valueArr.operator = "multiply";
}

function divideNumber() {
  storeNumber();
  valueArr.operator = "divide";
}

function operateNumber() {
  console.log(valueArr);
  if (valueArr.operator === "add") {
    total = Number(valueArr.oldValue) + Number(valueArr.currentValue);
    resultText.textContent = total;
    valueArr.oldValue = total;
    console.log("add");
  } else if (valueArr.operator === "subtract") {
    total = Number(valueArr.oldValue) - Number(valueArr.currentValue);
    resultText.textContent = total;
    valueArr.oldValue = total;
    console.log("subtract");
  } else if (valueArr.operator === "multiply") {
    total = Number(valueArr.oldValue) * Number(valueArr.currentValue);
    resultText.textContent = total;
    valueArr.oldValue = total;
    console.log("multiple");
  } else if (valueArr.operator === "divide") {
    total = Number(valueArr.oldValue) / Number(valueArr.currentValue);
    resultText.textContent = total;
    valueArr.oldValue = total;
    console.log("divide");
  } else if (valueArr.operator === "modulo") {
    total = Number(valueArr.oldValue) % Number(valueArr.currentValue);
    resultText.textContent = total;
    valueArr.oldValue = total;
  } else {
    return console.log("niyek");
  }
}

equal.addEventListener("click", (e) => {
  storeNumber();
  console.log("equals");
});

clear.addEventListener("click", (e) => {
  e.preventDefault();
  valueArr = [
    {
      oldValue: "",
      operator: "",
      currentValue: "",
    },
  ];
  resultText.textContent = "";
  flagNumber = true;
});
