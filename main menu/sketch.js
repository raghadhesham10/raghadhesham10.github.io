let gameState = "play"; // Initially set to "play"
let playerLoses = true; // For demonstration, initially set to true
let shopClicked = false; // Track if Shop option is clicked
let homeClicked = false; // Track if Home option is clicked

function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240);
  if (playerLoses) {
    displayMenu(); // Display the menu if the player loses
  } else {
    // Your game code goes here when the player is playing
    // For example:
  }

  if (shopClicked) {
    displaySquare();
  }

  if (homeClicked) {
    displayTriangle();
  }
}

function mousePressed() {
  if (playerLoses) {
    // Check which menu option was clicked
    let menuX = width / 6;
    let menuY = height / 4;
    let menuWidth = width / 1.5;
    let menuHeight = height / 2.1;

    let buttonWidth = menuWidth - 100;
    let buttonHeight = 60;

    if (
      mouseX > menuX + 50 &&
      mouseX < menuX + 50 + buttonWidth &&
      mouseY > menuY + 130 &&
      mouseY < menuY + 130 + buttonHeight
    ) {
      // Play again option
      resetGame();
    } else if (
      mouseX > menuX + 50 &&
      mouseX < menuX + 50 + buttonWidth &&
      mouseY > menuY + 230 &&
      mouseY < menuY + 230 + buttonHeight
    ) {
      // Shop option
      shopClicked = true;
      homeClicked = false; // Ensure only one shape is displayed at a time
    } else if (
      mouseX > menuX + 50 &&
      mouseX < menuX + 50 + buttonWidth &&
      mouseY > menuY + 330 &&
      mouseY < menuY + 330 + buttonHeight
    ) {
      // Home option
      homeClicked = true;
      shopClicked = false; // Ensure only one shape is displayed at a time
    }
  }
}

function displayMenu() {
  let menuX = width / 6;
  let menuY = height / 4;
  let menuWidth = width / 1.5;
  let menuHeight = height / 2.1;

  fill(50, 150, 200);
  rect(menuX, menuY, menuWidth, menuHeight, 20);

  fill(0);
  textSize(96);
  text("You Lose!", width / 2, menuY + 70);

  let buttonWidth = menuWidth - 100;
  let buttonHeight = 60;

  fill(100, 200, 100);
  rect(menuX + 50, menuY + 130, buttonWidth, buttonHeight, 10);
  fill(0);
  textSize(48);
  text("Play Again", menuX + buttonWidth / 2 + 50, menuY + 165);

  fill(100, 200, 100);
  rect(menuX + 50, menuY + 230, buttonWidth, buttonHeight, 10);
  fill(0);
  textSize(48);
  text("Shop", menuX + buttonWidth / 2 + 50, menuY + 265);

  fill(100, 200, 100);
  rect(menuX + 50, menuY + 330, buttonWidth, buttonHeight, 10);
  fill(0);
  textSize(48);
  text("Home", menuX + buttonWidth / 2 + 50, menuY + 365);
}

function displaySquare() {
  background(240);
  fill(100, 200, 100);
  rect(width / 2 - 50, height / 2 - 50, 100, 100); // Display a square for Shop option
}

function displayTriangle() {
  background(240);
  fill(100, 200, 100);
  triangle(
    width / 2,
    height / 2 - 50,
    width / 2 + 50,
    height / 2 + 50,
    width / 2 - 50,
    height / 2 + 50
  ); // Display a triangle for Home option
}

function resetGame() {
  // Reset game variables or start a new game
  gameState = "play";
  playerLoses = false;
  shopClicked = false; // Reset Shop click state
  homeClicked = false; // Reset Home click state
}