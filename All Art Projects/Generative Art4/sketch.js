// Generative Art Design
// Raghad Ibrahim
// Oct 30, 2023
// creating a generatively-designed work of art
// sample 4

let cornerRadius = 10;
let colors = ["#daf8e3", "#97ebdb", "#00c2c7", "#0086ad"];

function setup() {
  createCanvas(2000, 2000);
  noLoop();
}

function draw() {
  background(0);
  squares();
}

function squares(){
  noFill();
  colorMode(RGB);
  for(i=0; i<width; i+=random(50, 60)){
    for(j=0 ;j<height; j+=random(50, 60)){
      let randomColor = color(colors[Math.floor(random(colors.length))]);
      //transparet 
      randomColor.setAlpha(190);
      stroke(randomColor);
      strokeWeight(3);
      square(i, j, random(40,60), cornerRadius);
    }
  }
}

function keyPressed(){
  if(key === "s") save("Generative Art4.png")
}