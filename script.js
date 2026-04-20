// Get all DOM elements to interact with
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resetBtn = document.getElementById("reset");
const resultsDiv = document.getElementById("results");
const scoreDiv = document.getElementById("score");
const winnerDiv = document.getElementById("winner");

// Initialize game state variables
let humanScore = 0; // Track player's score
let computerScore = 0; // Track computer's score
let gameOver = false; // Flag to check if game has ended

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
  return userInput.toLocaleLowerCase();
}

// Play game function
function playGame() {
  // initalise score variables
  let humanScore = 0;
  let computerScore = 0;

  //
  function playRound(humanChoice, computerChoice) {
    // Make humanChoice case-insensitive
    humanChoice = humanChoice.toLowerCase();

    // Determine the winner of the round
    if (humanChoice === computerChoice) {
      return "it's a tie!";
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      humanScore++;
      return "You win! " + humanChoice + " beats " + computerChoice;
    } else {
      computerScore++;
      return "You lose! " + computerChoice + " beats " + humanChoice;
    }
  }

  // Play 5 rounds
  for (let i = 1; i <= 5; i++) {
    console.log(`\n--- Round ${i} ---`);
    const humanSelection = prompt(
      `Round ${i}: Enter your choice: rock, paper, or scissors`,
    );
    const computerSelection = getComputerChoice();
    console.log(`Your choice: ${humanSelection}`);
    console.log(`Computer choice: 
    ${computerSelection}`);
    playRound(humanSelection, computerSelection);
    console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
  }

  // Announce the overall winner
  console.log(`\n=== GAME OVER ===`);
  console.log(`Final Score - You: ${humanScore}, Computer: ${computerScore}`);
  if (humanScore > computerScore) {
    console.log("🎉 You win the game!");
  } else if (computerScore > humanScore) {
    console.log("💻 Computer wins the game!");
  } else {
    console.log("🤝 It's a tie game!");
  }
}

// Start the game
playGame();
