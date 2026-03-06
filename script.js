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

  // Test that the function
  console.log(getComputerChoice());
}
