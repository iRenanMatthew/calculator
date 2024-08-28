let numbers = document.querySelectorAll(".bg-numbers");
let operators = document.querySelectorAll(".bg-operators");
let resultText = document.querySelector(".calculatorScreen");
let value1, value2;
let valueArr = [
  {
    oldValue: "",
    operator: "",
    currentValue: "",
  },
];

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (resultText.textContent === "+") {
      resultText.textContent = "";
      resultText.textContent += event.target.innerText;
    } else {
      resultText.textContent += event.target.innerText;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (e.target.classList.contains("square-root")) {
      console.log("squareroot");
    } else if (e.target.classList.contains("divide")) {
      console.log("divide");
    } else if (e.target.classList.contains("multiply")) {
      console.log("multiply");
    } else if (e.target.classList.contains("subtract")) {
      console.log("subtract");
    } else if (e.target.classList.contains("add")) {
      addNumber();
      console.log("add");
    }
  });
});

function addNumber() {
  value1 = resultText.textContent;
  resultText.textContent = "+";
  valueArr[0].currentValue = value1;
  valueArr[0].operator = "+";
  console.log(valueArr);
}
