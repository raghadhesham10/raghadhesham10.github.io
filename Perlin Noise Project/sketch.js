// Perlin Noise Project
// Raghad Ibrahim
// Oct 6, 2023
// Creating a series of recs to create mountains with a flag
// The flag is placed at the highes peak

//global variables
let noiseShift = 0.01; 
let widthRec = 1;
let heightRec;
let heightTime = 1;
let heightTimeShift = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  background(204, 255, 255);
  generateTerrain();
  frameRate(8.5);
}

function generateTerrain(){
  strokeWeight(5);
  stroke(139, 235, 203);
  //checking the highest peak to draw the flag.
  let tallest = 0;
  let tallestX = 0;
  for(let x = 0; x<width; x += widthRec){
    if (heightRec > tallest){
      tallest = heightRec;
      tallestX = x;
    }
    //making it smooth using perlin noise
    heightRec = noise(heightTime);
    heightRec = map(heightRec, 0, 1, 0, height);
    heightTime += noiseShift;
    rect(x,height,x + widthRec, height - heightRec);
  }
  drawFlag(tallestX, height - tallest- 20);
}

//drawing the flag
function drawFlag(x,y){
  strokeWeight(1);
  stroke(255, 0, 0);
  fill(255, 0, 0);
  triangle(x, y, x+16, y-4, x, y-8);
  line(x,y,x,y+20);
}

//making it move
function draw(){
  background(204, 255, 255);
  heightTime = 40;
  heightTime += heightTimeShift;
  heightTimeShift+= 0.1;
  generateTerrain();

}


