// 3D basiscs and CSS centering
// RAghad Ibrahim
// Nov 23, 2023
// Building w/ 3D primitivs + centering 


let angle = 5;

function setup() {
  createCanvas(400, 400, WEBGL);
// WEBGL has a 0,0 at the center
angleMode(DEGREES);
}

function draw() {
  background(0);
  rotateY(frameCount);
  angle = map(mouseX, 0, width, -120, 120);
  for(let i = 0; i<360; i+=45){
    push();
    rotateY(i);
    boxes(30);
    pop();


  }
}

function boxes(size){
  if(size > 3){
    rotateZ(angle); //second rotation stacks on it
    translate(size*1.5, 0);
    box(size);
    boxes(size*0.8);  // make it smaller each time
  }

}