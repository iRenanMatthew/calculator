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
  resultText.textContent = "";
  if (!flagNumber) {
    valueArr[0].oldValue = value;
    flagNumber = true;
  } else {
    valueArr[0].currentValue = value;
    operateNumber();
  }
}

function addNumber() {
  storeNumber();
  valueArr[0].operator = "add";
}

function subtractNumber() {
  storeNumber();
  valueArr[0].operator = "subtract";
}

function multiplyNumber() {
  storeNumber();
  valueArr[0].operator = "multiply";
}

function divideNumber() {
  storeNumber();
  valueArr[0].operator = "divide";
}

function operateNumber() {
  console.log(valueArr);
  if (valueArr[0].operator === "add") {
    total = Number(valueArr[0].oldValue) + Number(valueArr[0].currentValue);
    resultText.textContent = total;
    valueArr[0].oldValue = total;
    console.log("add");
  } else if (valueArr[0].operator === "subtract") {
    total = Number(valueArr[0].oldValue) - Number(valueArr[0].currentValue);
    resultText.textContent = total;
    valueArr[0].oldValue = total;
    console.log("subtract");
  } else if (valueArr[0].operator === "multiply") {
    total = Number(valueArr[0].oldValue) * Number(valueArr[0].currentValue);
    resultText.textContent = total;
    valueArr[0].oldValue = total;
    console.log("multiple");
  } else if (valueArr[0].operator === "divide") {
    total = Number(valueArr[0].oldValue) / Number(valueArr[0].currentValue);
    resultText.textContent = total;
    valueArr[0].oldValue = total;
    console.log("divide");
  } else if (valueArr[0].operator === "modulo") {
    total = Number(valueArr[0].oldValue) % Number(valueArr[0].currentValue);
    resultText.textContent = total;
    valueArr[0].oldValue = total;
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
