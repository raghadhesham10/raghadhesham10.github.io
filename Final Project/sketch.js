// Final Project
// Raghad Ibrahim
// Date
//write a code if key code is not a number
// they are still overlapping
// sponge is declared in set up, can't use it in the functio

let phase = 4;
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
//boss
let bossAnimation = [];
let startBoss = [];
let endBoss = [];
let circles = [];
let bossTime=0;
let bossFrame = 0;
let villain;

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
  //boss entrance animation
  for (let i = 0; i < 7; i++) {
    startBoss.push(loadImage("assets/villian/" + i + ".png"));
  }
  //boss end animation
  for (let i = 6; i >= 0; i--) {
    endBoss.push(loadImage("assets/villian/" + i + ".png"));
  }
  //boss aniation
  for (let i = 6; i < 12; i++) {
    bossAnimation.push(loadImage("assets/villian/" + i + ".png"));
  }
}

function setup() {
  createCanvas(1920, 1080);
  sponge = new Character();
}

function draw() {
  imageMode(CENTER);
  image(bImage, width/2, height/2);
  imageMode(CORNER);
  textSize(60);
  text(score, 1670, 90);
  text(jamScore, 1670, 213);
  moveAndDisplaySponge();

  if (phase === 1){
    pushingCollectibles();
    moveAndDisplayCollectibles();
    if(obstacles.length === 0){
      image(startBoss[bossFrame], 0, 250);
      if(frameCount%7===0)bossFrame++;
      if(bossFrame===7){
        bossTime = 0;
        phase = 2;
      }
    }
    else moveAndDisplayObstacles();
  }

  if (phase === 2){
    pushingCollectibles();
    moveAndDisplayCollectibles();
    image(bossAnimation[int(frameCount/10) % 6], 0, 250);
    moveAndDisplayCircles();
    if (frameCount % 70 === 0) {
      circles.push(new MovingCircles());
    }
    bossTime++;
    if (bossTime === 500) {
      phase = 3;
      bossFrame = 0; 
    }
  }

  if (phase === 3){
    pushingCollectibles();
    moveAndDisplayCollectibles();
    if (bossFrame < 7){
      image(endBoss[bossFrame], 0, 250);
      moveAndDisplayCircles();
    }
    if(frameCount%7===0)bossFrame++;
    if(bossFrame>=7){
      if (circles.length === 0) phase = 4;
      else moveAndDisplayCircles();
    }
  }

  if (phase === 4){
    // Add new obstacles at regular intervals
    if (frameCount % obstacleInterval === 0) {
      obstacles.push(new Obstacle(rock));
    }
    pushingCollectibles();
    // // Decrease generation interval over time
    // if (burgerInterval > 40) burgerInterval -= 1;
    // if(obstacleInterval > 70) obstacleInterval -=1;
    moveAndDisplayCollectibles();
    moveAndDisplayObstacles();
  }
}

function keyPressed(){
  if (keyCode === 49) phase = 1;
  if (keyCode === 50) phase = 2;
  if (keyCode === 51) phase = 3;
  if (keyCode === 52) phase = 4;
  if (keyCode === 53) phase = 5;
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

class MovingCircles{
  constructor(){
    this.y = height/2;
    this.x = 200;
    this.speed = 5;
    this.radius = 30;
    this.time = random(100);
  }
  update() {
    let n = noise(this.time);
    this.x += this.speed;
    this.y += map(n, 0, 1, -10, 10);
    this.time += 0.01;
  }

  display() {
    fill(0, 115, 72);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }

  isOffScreen() {
    return this.x > width;
  }
}

function moveAndDisplayCircles() {
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();

    if (circles[i].isOffScreen()) {
      circles.splice(i, 1);
    }
  }
}

function moveAndDisplaySponge(){
  sponge.display();
  sponge.move();
  sponge.gravity();
}

function moveAndDisplayObstacles(){
  sponge = new Character();
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

function moveAndDisplayCollectibles(){
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
}

function pushingCollectibles(){
  // Add new burgers at regular intervals
  if (frameCount % burgerInterval === 0) {
    collectibles.push(new Food(burgerImage));
  }
  // Add jams rarely
  if(random(1000)< 1){
    collectibles.push(new Food(jamImage));
  }
}