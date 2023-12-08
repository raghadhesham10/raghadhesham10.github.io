// Using External Liberaries
// Raghad Ibrahim
// Dec 1, 2024

let scribble; 
let rW = 150;
let rH = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scribble = new Scribble(); 
  strokeWeight(4);
}

function draw() {
  background(220);
  if (collideRectCircle(width/2, height/2, rW, rH, mouseX, mouseY, 120)){
    fill(0, 120, 50);
  }
  else{
    fill(255);
  }
  rect(width/2, height/2, rW, rH);
  scribble.scribbleEllipse(mouseX, mouseY, 120, 120);
}
