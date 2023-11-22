// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  staticClock();
}

function staticClock(){
  stroke(0);
  strokeWeight(1);
  circle(width/2, height/2, 480);
  for(x = 0; x < 480; x += 40){
    strokeWeight(3);
    line()

  }
}
//could use millis