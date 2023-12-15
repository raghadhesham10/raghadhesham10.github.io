// Final Project
// Raghad Ibrahim
// Date

let sAnimation = []; // Array to hold sponge animation frames
let spongeY;
let bImage;  //background
let gravityPoint;

// collectables
let burgers = [];
let food;
let burgerSpeed = 10;
let score = 0;

function preload() {
  //spongebob animation
  for (let i = 0; i < 4; i++) {
    sAnimation.push(loadImage("assets2/" + i + ".png"));
  }
  //background
  bImage = loadImage("assets2/5.png");
  food = loadImage("assets2/4.png");
}

function setup() {
  createCanvas(1920, 1080);
  frameRate(10);
  imageMode(CENTER);
  spongeY = height / 2;
  gravityPoint = height / 2;
}

function draw() {
  gravity();
  movement();
  //displaying images
  image(bImage, width/2, height/2);
  image(sAnimation[frameCount % 4], 1350, spongeY);

  // Add new burgers at regular intervals
  if (frameCount % 80 === 0) {
    burgers.push(new Burger());
  }

  // Display and update each burger
  for (let i = burgers.length - 1; i >= 0; i--) {
    burgers[i].display();
    burgers[i].update();
    // If burger (coin) is off the screen, remove it from the array
    if (burgers[i].offscreen()) {
      burgers.splice(i, 1);
    }
  }
}

// Move player with arrow keys
function movement(){
  if (keyIsDown(UP_ARROW) && spongeY > 150) {
    spongeY -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && spongeY < height - 150) {
    spongeY += 10;
  }
}

//creates a garvity effect at the center of the tank
function gravity(){
  if (!keyIsPressed){
    if(spongeY > gravityPoint) spongeY-=15;
    if(spongeY < gravityPoint) spongeY+=15;
  }
}

class Burger{
  constructor(){
    this.x = -food.width;
    this.y = random(height - 150, 150);
  }
  display(){
    image(food, this.x, this.y);
  }
  update() {
    this.x += burgerSpeed;
  }
  offscreen() {
  return this.x > width; // Check if the burger is completely offscreen on the right side
  }
}