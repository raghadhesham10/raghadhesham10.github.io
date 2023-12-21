// Final Project
// Raghad Ibrahim
// Date

let sAnimation = []; // Array to hold sponge animation frames
let bImage;  //background
let sponge;
let collectibles = [];
let obstacles = [];
let burgerImage;
let jamImage;
let rock;
let burgerInterval = 80;
let obstacleInterval = 200;
let jamInterval = 80;
let score = 0;
let jamScore = 0;

function preload() {
  //spongebob animation
  for (let i = 0; i < 4; i++) {
    sAnimation.push(loadImage("assets/" + i + ".png"));
  }
  // Random background
  let num = Math.floor(random(1, 3));
  bImage = loadImage("assets/backg" + num + ".png");
  burgerImage = loadImage("assets/4.png");
  jamImage = loadImage("assets/5.png");
  rock = loadImage("assets/rock.png");

}

function setup() {
  createCanvas(1920, 1080);
  sponge = new Character();
}

function draw() {
  imageMode(CENTER);
  image(bImage, width/2, height/2);
  imageMode(CORNER);
  sponge.display();
  sponge.move();
  sponge.gravity();
  textSize(60);
  text(score, 1670, 90);
  text(jamScore, 1670, 213);

  // Add new burgers and obstacles at regular intervals
  if (frameCount % burgerInterval === 0) {
    collectibles.push(new Food(burgerImage));
  }
  if (frameCount % obstacleInterval === 0) {
    obstacles.push(new Obstacle(rock));
  }

  // // Decrease generation interval over time
  // if (burgerInterval > 40) burgerInterval -= 1;
  // if(obstacleInterval > 70) obstacleInterval -=1;

  // Add jams rarely
  if(random(1000)< 1){
    collectibles.push(new Food(jamImage));
  }

  for (let i = collectibles.length - 1; i >= 0; i--) {
    collectibles[i].display();
    collectibles[i].update();
    // If collectible is off the screen, remove it from the array
    if (collectibles[i].offscreen()) {
      collectibles.splice(i, 1);
    }
    //collide
    if (collideRectRect(sponge.x + 100, sponge.y - 80, 100, 80, collectibles[i].x, collectibles[i].y, 100, 82)){
      if (collectibles[i].image === burgerImage){
        score += 1; //increase burger score
      }
      else{
        jamScore += 1; //increase jam score
      }
      collectibles.splice(i, 1);
    }
  }

 // looping through obstacle arrays
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].display();
    obstacles[i].update();
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
    if (collideRectRect(sponge.x + 100, sponge.y - 80, 
      100, 80, obstacles[i].x, obstacles[i].y, 360, 250)){
      noLoop()
    }
  }
}



class Character{
  constructor(){
    this.x = width / 1.4;
    this.y = height / 2 
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
    image(sAnimation[int(frameCount/10) % 4], this.x, this.y-sAnimation[0].height/2, 306, 295);
  }
}

class Food{
  constructor(image){
    this.image = image
    this.x = -image.width;
    this.y = random(height - 150, 150);
    this.speed = 10;
  }
  display(){
    image(this.image, this.x, this.y);
  }
  update() {
    this.x += this.speed;
  }
  offscreen() {
  return this.x > width; // returns true if offscreen
  }
}

class Obstacle extends Food{
  constructor(image){
    super(image)
    if(collectibles.length > 0){
      while(dist(0, this.y, 0,
      collectibles[collectibles.length-1].y) < image.height){
        this.y = random(height - 150, 150);
      }
    }
  }
}