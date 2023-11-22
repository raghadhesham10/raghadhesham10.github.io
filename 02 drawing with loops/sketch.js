// Project Title
// Your Name
// Date

//global variables
let numSegments = 50;
let segmentHeight; //height/numSegments
const GRID_SPACING = 30; //const means that I can't change this variable. I am not planning on changing it!


function setup() {
  createCanvas(windowWidth, windowHeight);
  segmentHeight = height / numSegments;

}
function draw() {
  noLoop();//?
  gradiant();
  drawGrid()

}
function gradiant(){
  //use a loop to create a grdaiant background
  noStroke();
  for(let i = 0; i< numSegments; i++){ //increase i by one each time
    let y = i * segmentHeight;
    let fillValue = map(y,0,height,0,255); //?
    fill(fillValue, 255-fillValue, 200);
    // when R === G === b ; makes grey gradiant
    rect(0, y, width, segmentHeight); //x,y,width,height
  } 
  stroke(0);
}

function drawGrid() {
  //Draw some element using nested loops
  for (let x = 0; x < width; x = x + GRID_SPACING){
    for(let y = 0; y < height; y = y + GRID_SPACING){
      fill(0);
      //circle(x,y,10);

      //test 1
      //noCursor();
      //line(mouseX,mouseY,x,y);

      //test2
      if (dis(x,y,mouseX,mouseY) < 50){
        fill(255,0,0);
      }
      else{
        fill(0);
      }
    }
  }
 
}
