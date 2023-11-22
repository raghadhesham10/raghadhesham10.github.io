// Raghad Ibrahim
// Sept 28, 2023
// Multi-coloured Grid

//Global variables
let GRID_SPACING = 25; 


function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault())
}

function drawGrid() {
  //draw grid
  //checking if x + GRID_SPACING < width so all squares are complete and not cut off
  //checked y too
  for (let x = 0; x + GRID_SPACING < width; x = x + GRID_SPACING) {
    for (let y = 0; y + GRID_SPACING < height; y = y + GRID_SPACING) {
      //create a random color for each square
      fill(random(255), random(255),0);
      rect(x,y, GRID_SPACING, GRID_SPACING);
    }
  }
}

function keyPressed(){
  fill(random(255), random(255), 0);
  drawGrid();
}
//changing sizes
function mousePressed(){
  if(mouseButton === LEFT){
    GRID_SPACING+=5;
    clear();
  }
  else if(mouseButton === RIGHT){
    //preventing GRID_SPACING from = 0 or a negative number
    if (GRID_SPACING > 10){
      GRID_SPACING-=5;
      clear();
    }
  }
  drawGrid()
}