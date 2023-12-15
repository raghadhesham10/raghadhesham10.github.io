// Final Project
// Raghad Ibrahim
// Date

let sAnimation = []; // Array to hold sponge animation frames
let bImage;  //background
let sponge;
// collectables
let burgers = [];
let burgerImage;
let burgerSpeed = 10;
let burgerInterval = 80;
let score = 0;

function preload() {
  //spongebob animation
  for (let i = 0; i < 4; i++) {
    sAnimation.push(loadImage("assets2/" + i + ".png"));
  }
  //background
  bImage = loadImage("assets2/5.png");
  burgerImage = loadImage("assets2/4.png");
}

function setup() {
  createCanvas(1920, 1080);
  frameRate(10);
  sponge = new Character();
}

function draw() {
  imageMode(CENTER);
  image(bImage, width/2, height/2);
  imageMode(CORNER);
  sponge.display();
  sponge.move();
  sponge.gravity();

  // Add new burgers at regular intervals
  if (frameCount % burgerInterval === 0) {
    burgers.push(new Burger());
  }
  // Decrease burger generation interval over time
  if (burgerInterval > 40) {
    burgerInterval -= 1;
  }

  // Display and update each burger
  for (let i = burgers.length - 1; i >= 0; i--) {
    burgers[i].display();
    burgers[i].update();
    // If burger (coin) is off the screen, remove it from the array
    if (burgers[i].offscreen()) {
      burgers.splice(i, 1);
    }
    //collide
    if (collideRectRect(sponge.x, sponge.y, 185, 295, burgers[i].x, burgers[i].y, 100, 82)){
      burgers.splice(i, 1);
      score+=1;
    }
  }
  rect(sponge.x, sponge.y, 185, 295);
}

class Character{
  constructor(){
    this.x = width / 1.4;
    this.y = height / 2;
    this.g = height / 2;
  }
  move(){
    if (keyIsDown(UP_ARROW) && this.y > 150) {
      this.y -= 20;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - 150) {
      this.y += 20;
    }
  }
  gravity(){
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)){
      if(this.y > this.g) this.y-=15;
      if(this.y < this.g) this.y+=15;
    }
  }
  display(){
    image(sAnimation[frameCount % 4], this.x, this.y-sAnimation[0].height/2, 306, 295);
  }
}

class Burger{
  constructor(){
    this.x = -burgerImage.width;
    this.y = random(height - 150, 150);
  }
  display(){
    image(burgerImage, this.x, this.y);
  }
  update() {
    this.x += burgerSpeed;
  }
  offscreen() {
  return this.x > width; // returns true if offscreen
  }
}