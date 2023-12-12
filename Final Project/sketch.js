// Final Project
// Raghad Ibrahim
// Date


let sponge = [];
function setup() {
  createCanvas(1920, 1080);
  frameRate(10);

}


function preload(){
  for(let i = 0; i< 3; i++){
    sponge.push(loadImage("assets/" + i + ".png"));
  }
}

function draw() {
  background(220);
  image(sponge[frameCount%3],0,0);
}
