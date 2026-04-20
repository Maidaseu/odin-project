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

function addResultMessage(message, type = "normal") {
  const messageDiv = document.createElement("div");
  messageDiv.className = "result-entry";

  // Add emoji based on message type
  if (type === "win") {
    messageDiv.style.color = "#27ae60";
    messageDiv.style.fontWeight = "bold";
    messageDiv.innerHTML = "✅ " + message;
  } else if (type === "lose") {
    messageDiv.style.color = "#e74c3c";
    messageDiv.innerHTML = "❌ " + message;
  } else if (type === "tie") {
    messageDiv.style.color = "#f39c12";
    messageDiv.innerHTML = "🤝 " + message;
  } else {
    messageDiv.innerHTML = message;
  }

  resultsDiv.appendChild(messageDiv);
  // Auto-scroll to show the latest message
  messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function playRound(humanChoice, computerChoice) {
  let resultMessage = "";
  let resultType = "";

  // Determine the winner of the round (same logic as original)
  if (humanChoice === computerChoice) {
    resultMessage = `It's a tie! Both chose ${humanChoice}`;
    resultType = "tie";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++; // Increment player score
    resultMessage = `You win! ${humanChoice} beats ${computerChoice}`;
    resultType = "win";
  } else {
    computerScore++; // Increment computer score
    resultMessage = `You lose! ${computerChoice} beats ${humanChoice}`;
    resultType = "lose";
  }

  // Update DOM with the round result (replaces console.log)
  addResultMessage(resultMessage, resultType);

  return resultMessage;

  // COMMIT 5: "Add score display update function"

  function updateScoreDisplay() {
    scoreDiv.textContent = `📊 Score - You: ${humanScore} | Computer: ${computerScore}`;
  }

  /**
   * Resets the game to its initial state
   */
  function resetGame() {
    // Reset scores
    humanScore = 0;
    computerScore = 0;
    gameOver = false;

    // Clear the results display
    resultsDiv.innerHTML = "";

    // Reset displays
    updateScoreDisplay();
    winnerDiv.textContent = "";
    winnerDiv.style.backgroundColor = "";
    winnerDiv.classList.remove("winner-announcement");

    // Re-enable buttons
    disableGameButtons(false);

    // Add reset confirmation message
    addResultMessage(
      "🔄 Game reset! Make your choice to start playing.",
      "normal",
    );
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
