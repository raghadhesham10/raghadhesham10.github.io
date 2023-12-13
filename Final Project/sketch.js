// Final Project
// Raghad Ibrahim
// Date

let sponge = []; // Array to hold sponge animation frames
let spongeY;
let bgImage;  //background

// collectables
let burgers = [];
let burgerSpeed = 2;
let score = 0;

function preload() {
  //spongebob animation
  for (let i = 0; i < 4; i++) {
    sponge.push(loadImage("assets2/" + i + ".png"));
  }
  //background
  bgImage = loadImage("assets2/5.png");
}

function setup() {
  createCanvas(1920, 1080);
  frameRate(10);
  imageMode(CENTER);
  // defined in setup bc height/2 is unknown before the canvas is created.
  spongeY = height / 2;
}

function draw() {
  background(220);
  // display background
  image(bgImage, width/2, height/2);
  // display the current frame of the sponge animation
  image(sponge[frameCount % 4], 1350, spongeY);

  // Move player with arrow keys
  if (keyIsDown(UP_ARROW) && spongeY > 150) {
    spongeY -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && spongeY < height - 150) {
    spongeY += 10;
  }
}