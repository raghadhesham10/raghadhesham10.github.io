// Repositioning Rectangles
// Raghad Ibrahim
// Sept 27, 2023
// Simple GUI creation / Geometry practice

//Global variables
let x, y, rWidth, rHeight;
let rLeft, rRight, rTop, rBottom;
let mouseOver = false; //are we hovering over the rectangle?
let pickedUp = false;
let xOff; 
let yOff;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER); //(x,y) is centered instead of up left corner 
  x = width/2; y = height/2;
  rWidth=200; rHeight = 100;
}

function drawRectangle(){//render the rect and handle dragging
  UpdateEdgePosition();
  //check if mouse is ovr or not
  if(mouseX > rLeft && mouseX < rRight && mouseY > rTop && mouseY < rBottom){
    mouseOver = true;
    fill(170, 190, 50);
  }
  else{
  mouseOver = false;
  fill(35, 70, 125);
  }

  if(pickedUp){
    x= mouseX + xOff;
    y= mouseY + yOff;
  }
  rect(x,y,rWidth,rHeight);
 }

function mousePressed(){
  if(mouseOver){
    pickedUp = true;
    xOff = x-mouseX;
    yOff = y-mouseY;
  }
}
  function mouseReleased(){
    pickedUp = false;

  }


function UpdateEdgePosition(){
  //Update the left/right/top/bottom properties
  rLeft = x-rWidth/2; rRight= x + rWidth/2;
  rTop= y-rHeight/2; rBottom = y+rHeight/2;

}

function draw() {
  background(220);
  drawRectangle();
}
