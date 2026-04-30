// Executes a calculation based on the given operator and operands
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Nice try. Can't divide by 0 😏";
  return a / b;
}

function operate(operator, a, b) {
  // Determines which operation to run based on the operator symbol.
  // Converts string inputs (from UI) into numbers before calculation.
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// APPLICATION STATE
// Stores the current state of the calculator.

// Stores first number entered
let firstNumber = "";

// Stores second number entered
let secondNumber = "";

// Stores selected operator (+, -, *, /)
let operator = null;

// Controls whether display should reset on next input
let shouldResetDisplay = false;

const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value;
}

// DISPLAY MANAGEMENT
// Handles all updates to the screen

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

// OPERATOR HANDLING
// Handles +, -, *, / button clicks
// When an operator is clicked, it sets the current operator and prepares for the next number input.

const operatorButtons = document.querySelectorAll(".operator");

// Attach click event to each operator button
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.textContent);
  });
});

// Sets operator and handles chained calculations
function chooseOperator(op) {
  // Prevent operator selection without a first number
  if (firstNumber === "") return;

  // If second number exists, evaluate previous expression first
  // This allows chaining (e.g. 12 + 7 - 1)
  if (secondNumber !== "") {
    const result = operate(operator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    secondNumber = "";
  }

  operator = op;
  shouldResetDisplay = true;
}
