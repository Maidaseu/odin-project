// Get all DOM elements to interact with
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resetBtn = document.getElementById("reset");
const resultsDiv = document.getElementById("results");
const scoreDiv = document.getElementById("score");
const winnerDiv = document.getElementById("winner");

// Initialize game state variables
let humanScore = 0;
let computerScore = 0;
let gameOver = false;

// Computer choice
function getComputerChoice() {
  const random = Math.random();
  if (random < 0.33) return "rock";
  if (random < 0.66) return "paper";
  return "scissors";
}

// Add message to UI
function addResultMessage(message, type = "normal") {
  const messageDiv = document.createElement("div");
  messageDiv.className = "result-entry";

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
  messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Play one round
function playRound(humanChoice, computerChoice) {
  let resultMessage = "";
  let resultType = "";

  if (humanChoice === computerChoice) {
    resultMessage = `It's a tie! Both chose ${humanChoice}`;
    resultType = "tie";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    resultMessage = `You win! ${humanChoice} beats ${computerChoice}`;
    resultType = "win";
  } else {
    computerScore++;
    resultMessage = `You lose! ${computerChoice} beats ${humanChoice}`;
    resultType = "lose";
  }

  addResultMessage(resultMessage, resultType);
}

// Update score UI
function updateScoreDisplay() {
  scoreDiv.textContent = `📊 Score - You: ${humanScore} | Computer: ${computerScore}`;
}

// Check winner (first to 5)
function checkWinner() {
  if (humanScore >= 5 || computerScore >= 5) {
    gameOver = true;

    if (humanScore > computerScore) {
      winnerDiv.textContent = "🎉 You win the game!";
      winnerDiv.style.backgroundColor = "#27ae60";
    } else {
      winnerDiv.textContent = "💻 Computer wins the game!";
      winnerDiv.style.backgroundColor = "#e74c3c";
    }

    winnerDiv.classList.add("winner-announcement");
    disableGameButtons(true);
  }
}

// Disable/enable buttons
function disableGameButtons(disabled) {
  rockBtn.disabled = disabled;
  paperBtn.disabled = disabled;
  scissorsBtn.disabled = disabled;
}

// Reset game
function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;

  resultsDiv.innerHTML = "";
  updateScoreDisplay();

  winnerDiv.textContent = "";
  winnerDiv.style.backgroundColor = "";
  winnerDiv.classList.remove("winner-announcement");

  disableGameButtons(false);

  addResultMessage("🔄 Game reset! Start playing.", "normal");
}

// Handle player click
function handlePlayerChoice(choice) {
  if (gameOver) {
    addResultMessage("⚠️ Game over! Click Reset.", "normal");
    return;
  }

  const computerChoice = getComputerChoice();

  addResultMessage(
    `You: ${choice.toUpperCase()} | Computer: ${computerChoice.toUpperCase()}`,
  );

  playRound(choice, computerChoice);
  updateScoreDisplay();
  checkWinner();
}

// Event listeners
rockBtn.addEventListener("click", () => handlePlayerChoice("rock"));
paperBtn.addEventListener("click", () => handlePlayerChoice("paper"));
scissorsBtn.addEventListener("click", () => handlePlayerChoice("scissors"));
resetBtn.addEventListener("click", resetGame);

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (gameOver) return;

  if (event.key.toLowerCase() === "r") handlePlayerChoice("rock");
  if (event.key.toLowerCase() === "p") handlePlayerChoice("paper");
  if (event.key.toLowerCase() === "s") handlePlayerChoice("scissors");
  if (event.key === "Enter") resetGame();
});

// Init
updateScoreDisplay();
