// Raghad Ibrahim
// Sept 28, 2023
//

//Global variables
let numSegments = 25;
let GRID_SPACING = 25; 


function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault())
}

function drawGrid() {
  //draw grid
  for (let x = 0; x < width; x = x + GRID_SPACING) {
    for (let y = 0; y < height; y = y + GRID_SPACING) {
      rect(x, y, 50, 50);
      //create a random color for each square
      fill(0, random(255), random(255));
      rect(x,y, GRID_SPACING, GRID_SPACING);
    }
  }
}

function keyPressed(){
  fill(0, random(255), random(255));
  drawGrid();
}
function mousePressed(){
  if(mouseButton === LEFT)GRID_SPACING+=5;
  else if(mouseButton === RIGHT)GRID_SPACING-=5;
  drawGrid()
}