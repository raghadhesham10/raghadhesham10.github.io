// Puzzle game starter
// Raghad Ibrahim
// Nov 6, 2023
// A first foray into working with 2D arrays.

let grid = 
[[0,    255,     0,     255,  255],
 [255,  255,     0,     255,  255],
 [255,  255,   255,     0,    255],
 [0,    0,       0,     255,    0]];

const NUM_ROWS = 4;   const NUM_COLS = 5;
let rectWidth = 50;   let rectHeight = 50;
let col, row; //x and y position of the mouse (grid)

function setup() {
  createCanvas(rectWidth*NUM_COLS, rectHeight*NUM_ROWS);
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();
  background(220);
  renderGrid();
  print(col, row);
}

function mousePressed(){
  //when the mouse is pressed, flip the correspoding 2d array
  //when going to flip 4 cardinal neighbours (N, S, E, W)
  flip(col,row);
  if (row > 0) flip(col, row-1);
  if (row < NUM_COLS-1) flip(col, row+1);
  if(col< NUM_COLS-1) flip(col-1, row);
  if(col>0) flip(col+1, row);
}

function flip(x,y){
  // at a given x y, flip the value in our 2D array
  // 0 to 255, 255 t0 0.
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x]= 0;
}

function cheater(){
  
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