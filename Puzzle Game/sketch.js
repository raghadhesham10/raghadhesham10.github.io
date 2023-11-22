// Puzzle game starter
// Raghad Ibrahim
// Nov 6, 2023
// A puzzle game where the play tries to make all the sauers the same color.
// using only two shape. Square/crosss

let grid = 
[[0,    255,     0,     255,  255],
 [255,  255,     0,     255,  255],
 [255,  255,   255,     0,    255],
 [0,    0,       0,     255,    0]];

const NUM_ROWS = 4;   const NUM_COLS = 5;
let rectWidth = 50;   let rectHeight = 50;
let col, row; //x and y position of the mouse (grid)
let cross = true;

function setup() {
  createCanvas(rectWidth*NUM_COLS, rectHeight*NUM_ROWS);
  randomizeBoard();
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();
  background(220);  
  renderGrid();
  winCondition();
  if (cross === true) crossOverlay();
  else squareOverlay();
}

function keyPressed(){
  if (key === " ") cross = !cross;    
}


function mousePressed(){
  //when the mouse is pressed, flip the correspoding 2d array
  //when going to flip 4 cardinal neighbours (N, S, E, W)
  if(keyIsPressed && keyCode === SHIFT){
    flip(col,row);
  }
  else{
    if (cross === true) crossShape();
    else squareShape();
  }
}

function crossOverlay(){
  fill(0, 255, 0, 127);
  if(keyIsPressed && keyCode === SHIFT){
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
  }
  else{
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (row > 0) rect(col * rectWidth, (row-1) * rectHeight, rectWidth, rectHeight);
    if (row < NUM_ROWS-1) rect(col * rectWidth, (row+1) * rectHeight, rectWidth, rectHeight);
    if (col < NUM_COLS-1) rect((col+1) * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (col > 0)rect((col-1) * rectWidth, row * rectHeight, rectWidth, rectHeight);
  }
}

function squareOverlay(){
  fill(0, 255, 0, 127);
  if(keyIsDown(SHIFT)){
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
  }
  else{
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (row > 0) rect(col * rectWidth, (row-1) * rectHeight, rectWidth, rectHeight);
    if (col > 0)rect((col-1) * rectWidth, row * rectHeight, rectWidth, rectHeight);
    if (row > 0 && col > 0) rect((col-1) * rectWidth, (row-1) * rectHeight, rectWidth, rectHeight);
  }
}

//flipping in cross shape
function crossShape(){
  flip(col,row);
  if (row > 0) flip(col, row-1);
  if (row < NUM_ROWS-1) flip(col, row+1);
  if (col < NUM_COLS-1) flip(col+1, row);
  if (col > 0)flip(col-1, row); 
}

//flipping in square shape
function squareShape(){
  flip(col,row);
  if (row > 0) flip(col, row-1);
  if (col > 0)flip(col-1, row);
  if (row > 0 && col > 0) flip(col-1, row-1);
}

function randomizeBoard() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      // Randomly set to 255 or 0
      //since Math.random will either be 0 or 1 after rounding.
      grid[y][x] = Math.round(Math.random()) * 255;
    }
  }
}

function flip(x,y){
  // at a given x y, flip the value in our 2D array
  // 0 to 255, 255 t0 0.
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function getCurrentX(){ //return the current column mouse is in
  let constrainX = constrain(mouseX, 0 , width - 1);
  return int(constrainX/rectWidth);
}

function getCurrentY(){ //return the current row mouse is in
  let constrainY = constrain(mouseY, 0, height - 1);
  return int(constrainY/rectHeight);
}

function renderGrid(){
  //creates a 2D grid of squares using information from our
  //2D Array for the corresponding fill values.
  for(let x = 0; x < NUM_COLS; x++){
    for(let y = 0; y < NUM_ROWS; y++){
      let fillValue = grid[y][x];
      fill(fillValue);
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}

function winCondition(){
  //checks if all colors on grid are the same
  //by creating an array where we push all each tile's color
  let values = [];
  for(let x = 0; x < NUM_COLS; x++){
    for(let y = 0; y < NUM_ROWS; y++){
      let tile = grid[y][x];
      values.push(tile);
    }
  }
  //Use the every method to check if all numbers in the array are equal
  let allEqual = values.every((value) => value === values[0]);
  if(allEqual) {
    textSize(30);
    fill("red");
    textAlign(CENTER, CENTER)
    text("You Won!", width/2, height/2 );
  }
}
