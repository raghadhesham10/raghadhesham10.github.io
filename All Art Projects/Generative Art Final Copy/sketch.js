// Generative Art Design
// Raghad Ibrahim
// Oct 30, 2023
// creating a generatively-designed work of art
// Final Copy

let side = 90;
let cornerRadius = 10;
let colors = ["#daf8e3", "#97ebdb", "#00c2c7", "#0086ad", "#005582"];

function setup() {
  createCanvas(2000, 2000);
  noLoop();
  rectMode(CENTER);
}

function draw() {
  background(220);
  squares();
}

function squares(){
  colorMode(RGB);
  for(i=0; i<width; i+=random(80, 90)){
    for(j=0 ;j<height; j+=random(80, 90)){
      let randomColor = colors[Math.floor(random(colors.length))];
      stroke(randomColor);
      strokeWeight(5);
      push();
      translate(i,j);
      rotate(random(TWO_PI));
      square(0, 0, side, cornerRadius);
      pop();
    }
  }
}

function keyPressed(){
  if(key === "s") save("Generative Art Design Assignment.png")
}

