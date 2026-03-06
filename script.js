// Write out the logic for the game
function getComputerChoice() {
  const random = Math.random();
  if (random < 0.33) {
    return "rock";
  } else if (random < 0.66) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Prompt the user for their choice
function getHumanChoice() {
  const userInput = prompt("Enter your choice: rock, paper or scissors");
  return userInput;
}

// Test the functions
console.log(getComputerChoice());
console.log(getHumanChoice());
