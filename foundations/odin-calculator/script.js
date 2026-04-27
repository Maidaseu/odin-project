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

// Select the correct operation based on the operator
function operate(operator, a, b) {
  // Convert inputs (UI gives strings)
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
