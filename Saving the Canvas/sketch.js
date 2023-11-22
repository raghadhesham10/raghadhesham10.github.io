// SAving the Canvas
// Raghad Ibrahim
// October 27, 2023
// saving canvas as png, canvas


function setup() {
  //resolution is fairly high
  createCanvas(3000, 1500);
  background(50);
  art();
}

function art(){
  //making a brilliant work of art
  noFill();
  stroke(255);
  rectMode(CENTER)
  strokeWeight(10);
  for(let d = 300; d<1400; d+=50){
    square(width/2, height/2, d)
  }
}

function keyPressed(){
  if(key === "s") save("CS30 Image.png");
}