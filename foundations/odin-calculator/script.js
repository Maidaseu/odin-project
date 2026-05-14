// ==============================
// BASIC MATH OPERATIONS
// Pure functions used to perform calculations
// ==============================

// Adds two numbers
function add(a, b) {
  return a + b;
}

// Subtracts second number from first number
function subtract(a, b) {
  return a - b;
}

// Multiplies two numbers
function multiply(a, b) {
  return a * b;
}

// Divides first number by second number
function divide(a, b) {
  // Prevent division by zero
  if (b === 0) return "Nice try";

  return a / b;
}

// Determines which operation to execute
function operate(operator, a, b) {
  // Convert string inputs from UI into numbers
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

// ==============================
// APPLICATION STATE
// Stores calculator data between interactions
// ==============================

// Stores first number entered by user
let firstNumber = "";

// Stores second number entered by user
let secondNumber = "";

// Stores currently selected operator
let operator = null;

// Determines whether next input should reset display
let shouldResetDisplay = false;

// ==============================
// DISPLAY MANAGEMENT
// Controls calculator screen updates
// ==============================

const display = document.getElementById("display");

// Updates calculator display with new value
function updateDisplay(value) {
  display.textContent = value;
}

// ==============================
// NUMBER INPUT HANDLING
// Handles digit and decimal button clicks
// ==============================

const numberButtons = document.querySelectorAll(".number");

// Add click listener to every number button
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

// Handles number input and updates display
function appendNumber(number) {
  // Prevent multiple decimal points
  if (number === "." && display.textContent.includes(".")) return;

  // Replace display after operator or equals press
  if (shouldResetDisplay) {
    updateDisplay(number);
    shouldResetDisplay = false;
  } else {
    // Replace default 0 or append number
    if (display.textContent === "0") {
      updateDisplay(number);
    } else {
      updateDisplay(display.textContent + number);
    }
  }

  // Store number depending on calculator state
  if (operator === null) {
    firstNumber = display.textContent;
  } else {
    secondNumber = display.textContent;
  }
}

// ==============================
// OPERATOR HANDLING
// Handles operator selection and chained calculations
// ==============================

const operatorButtons = document.querySelectorAll(".operator");

// Add click listener to every operator button
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.textContent);
  });
});

// Sets operator and handles chained operations
function chooseOperator(op) {
  // Prevent operator selection before entering first number
  if (firstNumber === "") return;

  // Prevent repeated operator presses
  // Example: 2 + + + should only keep latest operator
  if (operator !== null && secondNumber === "") {
    operator = op;
    return;
  }

  // Evaluate existing expression before continuing
  // Enables chaining like: 12 + 7 - 1
  if (secondNumber !== "") {
    let result = operate(operator, firstNumber, secondNumber);

    // Round long decimal results
    result = formatResult(result);

    // Update display and calculator state
    updateDisplay(result);

    firstNumber = result;
    secondNumber = "";
  }

  // Store selected operator
  operator = op;

  // Next number input should replace display
  shouldResetDisplay = true;
}

// ==============================
// EQUALS BUTTON HANDLING
// Executes calculation when "=" is pressed
// ==============================

const equalsButton = document.getElementById("equals");

// Add click listener to equals button
equalsButton.addEventListener("click", evaluate);

// Performs calculation and displays result
function evaluate() {
  // Prevent evaluation if expression is incomplete
  if (firstNumber === "" || operator === null || secondNumber === "") {
    return;
  }

  // Execute calculation
  let result = operate(operator, firstNumber, secondNumber);

  // Round decimal results
  result = formatResult(result);

  // Display final result
  updateDisplay(result);

  // Store result for future chained calculations
  firstNumber = result;

  // Reset operator and second number
  secondNumber = "";
  operator = null;

  // Next number input should reset display
  shouldResetDisplay = true;
}

// ==============================
// CLEAR BUTTON HANDLING
// Resets calculator to default state
// ==============================

const clearButton = document.querySelector(".clear");

// Add click listener to clear button
clearButton.addEventListener("click", clear);

// Clears calculator state and resets display
function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  shouldResetDisplay = false;

  updateDisplay("0");
}

// ==============================
// RESULT FORMATTING
// Prevents long decimal overflow
// ==============================

// Rounds decimal values to 3 decimal places
function formatResult(result) {
  // Skip rounding for error messages
  if (typeof result === "string") return result;

  return Math.round(result * 1000) / 1000;
}
