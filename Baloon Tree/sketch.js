// Baloon Tree
// Raghad Ibrahim
// Nov 24, 2023
// Creating a tree with circular leaves of random color and size.

let scale = 15;
let size;
let depthnum = 5;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  randomSeed(99);
  background(255);
  drawTree(width/2, height*.9, 90, 6);
}

function drawLine( x1, y1, x2, y2, depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  strokeWeight(depth);
  line(x1, y1, x2, y2);
}

function drawLeaf(x, y, s, depth){
    fill(random(255), random(255), random(255));
    circle(x, y, s, depth);
  }

function drawTree(x1, y1, angle, depth) {
  size =  map(mouseX, 0, width, 5, 30);
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle))*depth*scale); 
    //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle))*depth*scale); 
    //using trig ratios. Get shorter based on depth
    drawLine(x1, y1, x2, y2, depth);
    //for a 2-branch tree:
    drawTree(x2, y2, angle-size, depth-1);
    drawTree(x2, y2, angle+size, depth-1);
    drawTree(x2, y2, angle, depth-1);
    if(depth<depthnum){
      drawLeaf(x2, y2, 40 - random(depth*3, depth*5), depth-1);
    }
  }
}


function keyPressed(){
  if(keyIsDown(90)) depthnum--;
  else if(keyIsDown(88)) depthnum++;
}
