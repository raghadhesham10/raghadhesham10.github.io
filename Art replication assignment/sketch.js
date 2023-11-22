// Art replication warm up
// Raghad Ibrahim
// oct 26, 2023

//global variables
let firstX;
let firstY; 
let secondX;
let secondY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  firstX = width*0.25;
  firstY = height*0.75;
  secondX = random(width*0.25, width*0.75);
  secondY = height*0.75;
  noLoop();
}

function draw() {
  background(220);
  lines();
}

function lines(){
  for(let i=0; i<70; i++){
    line(firstX, firstY, secondX, secondY);
    firstX = secondX;
    firstY = secondY;
    if(i%2===1){
      secondX = random(width*0.25, width*0.75);//horizontal line
    }
    else {
      secondY = random(height*0.1, height*0.9);//vertical line
    }
  }
}
