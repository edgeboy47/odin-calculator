let result = 0;
let calculationString = "";
let operators = ["+", "-", "x", "÷"];

function reset() {
  calculationString = "";
  result = 0;
  updateCalculation();
  updateResult();
}
function updateCalculation() {
  document.querySelector(".calculation").innerHTML = calculationString;
}

function updateResult() {
  document.querySelector(".result").innerHTML = result;
}

function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      if (b == 0) {
        alert("Cannot divide by zero");
        return null;
      }
      return a / b;
  }
}

function hasOperator() {
  return operators.some((operator) => calculationString.includes(operator));
}

document.querySelectorAll(".operator").forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (calculationString === "") calculationString = "0";
    if (hasOperator()) return;
    if (result != 0) {
      calculationString = `${result}`;
    }
    calculationString = `${calculationString} ${operator.innerHTML}`;
    updateCalculation();
  });
});

document.querySelectorAll(".operand").forEach((operand) => {
  operand.addEventListener("click", (e) => {
    if (operators.includes(calculationString[calculationString.length - 1])) {
      calculationString += ` ${e.target.innerHTML}`;
    } else calculationString += e.target.innerHTML;
    updateCalculation();
  });
});

document.querySelector(".clear").addEventListener("click", function () {
  reset();
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML === "=") {
      let split = calculationString.split(" ");
      if (hasOperator() && split.length == 3) {
        let [a, operator, b] = split;
        result = +calculate(parseFloat(a), parseFloat(b), operator).toFixed(4);
        if (result === null) {
          reset();
          return;
        }
        updateResult();
        calculationString = "";
        updateCalculation();
      }
    }

    if (e.target.innerHTML == "%") {
      // TODO
    }

    if (e.target.innerHTML == "+/-") {
      // TODO
    }
    return;
  });
});
