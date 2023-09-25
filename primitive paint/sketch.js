// Primitive Paint
// Raghad Ibrahim
// September 18, 2023

let ballX, changeSize=5, ballSize=90;
let overlay;
let preview;
let colorA;
let currentShape;

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(width, height);
  ballX = width/2;
  colorA = color(random(255), random(255), random(255));  // choosing random colors for switching colors
  textFont("Helvetica"); // Change the font
  textSize(24); // Change the text size
}

function shapes() {
  if(keyIsPressed){ 
    if(key==="a") currentShape="rectangle";
    else if(key==="s") currentShape="ellipse";
    else if(key==="d") currentShape="triangle";
    else if(key==="c"){ //key for changing colors
      colorA = color(random(255), random(255), random(255));
    }
    else if(key===" "){
      overlay.clear(); // Clear the overlay when spacebar is pressed
    }
  }
  
  if(mouseIsPressed){
    overlay.noStroke(); //remove stroke from shapes
    overlay.fill(colorA);
    if (currentShape === "rectangle") {
      overlay.rect(mouseX, mouseY, 50, 25);
    }
    else if (currentShape === "ellipse") {
      overlay.ellipse(mouseX, mouseY, 50, 25);
    }
    else if (currentShape === "triangle") {
      overlay.triangle(mouseX, mouseY, mouseX - 50, mouseY + 100, mouseX + 50, mouseY + 100);
    }
  }
  image(overlay, 0, 0);
}
  
function draw() {
  background(220);
  drawAndMoveBall();
  shapes();
  drawPreview();
  // Adding my name to the canvas
  overlay.fill(0);
  text("Raghad Ibrahim", 20, height - 20);
}

//adding a new screen for a preview
function drawPreview() {
  preview = createGraphics(width, height);
  preview.noFill();
  preview.stroke(0) //set outline
  preview.strokeWeight(2) //set outline thinckness

  if (currentShape === "rectangle") {
    preview.rect(mouseX, mouseY, 50, 25);
  }
  else if (currentShape === "ellipse") {
    preview.ellipse(mouseX, mouseY, 50, 25);
  }
  else if (currentShape === "triangle") {
    preview.triangle(mouseX, mouseY, mouseX - 50, mouseY + 100, mouseX + 50, mouseY + 100);
  }
  image(preview, 0, 0);
}

function drawAndMoveBall(){
  //update the ball's size
  ballSize+=changeSize
  //decide if we need increase or decrease ball's size
  if (ballSize>=360||ballSize<=90){
    changeSize*=-1;
  }
 
  //render the ball on the screen
  noStroke();
  fill(174, 162, 242);
  circle(ballX, height/2, ballSize);
}
