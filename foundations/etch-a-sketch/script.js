// Get container and button from DOM
const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");

/**
 * Creates a grid of squares
 * @param {number} size - number of squares per side (e.g. 16 = 16x16)
 */
function createGrid(size) {
  // Clear existing grid before creating a new one
  container.innerHTML = "";

  // Calculate square size so total stays 960px
  const squareSize = 960 / size;

  // Create squares
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");

    // Add class for styling
    square.classList.add("square");

    // Set width and height dynamically
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Hover effect (draw)
    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "black";
    });

    // Add square to container
    container.appendChild(square);
  }
}

/**
 * Resize grid button logic
 * Runs only ONCE
 */
resizeBtn.addEventListener("click", () => {
  let size = prompt("Enter grid size (1 - 100):");

  size = Number(size);

  if (size > 0 && size <= 100) {
    createGrid(size);
  } else {
    alert("Please enter a number between 1 and 100.");
  }
});

// Initial grid
createGrid(16);
