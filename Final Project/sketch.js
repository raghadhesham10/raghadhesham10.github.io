// Final Project
// Raghad Ibrahim
// Date

// they are still overlapping
// bos error.
// speed is not increasing overtime, check variabls.
// resetting speed to 10 isnot working.
// create certian lanes for collectibles.


// main menue
let playerLoses = false;
let shopClicked = false; // Track if Shop option is clicked
let homeClicked = false; // Track if Home option is clicked

let phase = 4;
let sAnimation = []; // Array to hold sponge animation frames
let bImage;  //background
let bImage2;  // boss background
let sponge;
let collectibles = [];
let obstacles = [];
let burgerImage;
let jamImage;
let rockImage;
let collectiblesInterval = 80;
let obstacleInterval = 100;
let lanes = [0, 270, 270*2, 270*3];
let spongeLane = 270;
let jamInterval = 80;
let speedIncrease = 20;

// power ups
let double = [];
let magnet = [];
let shield = [];
let theDouble = false;
let theShield = false;
let theMagnet = false;
let doubleTime = 0;
let magnetTime = 0;
let shieldTime = 0;

// score and shop system
let score = 0;
let jamScore = 0;
let overallScore = 0;
let overallJamScore = 0;

// boss
let bossAnimation = [];
let startBoss = [];
let endBoss = [];
let circles = [];
let bossTime = 0;
let bossFrame = 0;
let villain;

//try
let jam;
let burger;
let rock;

function preload() {
  bImage = loadImage("assets/backg1.png");
  bImage2 = loadImage("assets/backg2.png");
  burgerImage = loadImage("assets/4.png");
  jamImage = loadImage("assets/5.png");
  rockImage = loadImage("assets/rock.png");
  //spongebob animation
  for (let i = 0; i < 4; i++) {
    sAnimation.push(loadImage("assets/" + i + ".png"));
  }
  //boss entrance animation
  for (let i = 0; i < 7; i++) {
    startBoss.push(loadImage("assets/villian/" + i + ".png"));
  }
  //boss end animation
  for (let i = 6; i >= 0; i--) {
    endBoss.push(loadImage("assets/villian/" + i + ".png"));
  }
  //boss moving animation
  for (let i = 6; i < 12; i++) {
    bossAnimation.push(loadImage("assets/villian/" + i + ".png"));
  }
  //power ups
  for (let i = 0; i < 4; i++) {
    double.push(loadImage("assets/powerups/double" + i + ".png"));
  }
  for (let i = 0; i < 4; i++) {
    magnet.push(loadImage("assets/powerups/magnet" + i + ".png"));
  }
  for (let i = 0; i < 4; i++) {
    shield.push(loadImage("assets/powerups/shield" + i + ".png"));
  }
}

function setup() {
  createCanvas(1920, 1080);
  sponge = new Character();
  rock = new Obstacle(rockImage);
  jam = new Food(jamImage);
  burger = new Food(burgerImage);
}

function draw() {
  if (playerLoses){
    textAlign(CENTER, CENTER);
    displayMenu();
    //update scores for shop system
    overallScore = overallScore = score;
    overallJamScore = overallJamScore + jamScore;
  }
  else{ 
    //normal game code
    textAlign(LEFT, BASELINE);
    if (phase === 4){ //morning background
      imageMode(CENTER);
      image(bImage, width/2, height/2);
      imageMode(CORNER);
    }
    else{ //switch to night background when boss enters
      imageMode(CENTER);
      image(bImage2, width/2, height/2);
      imageMode(CORNER);
    }
    sponge.display();
    sponge.move();
    sponge.gravity();
    textSize(60);
    text(score, 1670, 90);
    text(jamScore, 1670, 213);
    pushingCollectibles();
    moveAndDisplayCollectibles();

    if (phase === 1){
      //clearing obstacles before boss enters
      if(obstacles.length === 0){
        image(startBoss[bossFrame], 0, 250);
        if(frameCount%7===0)bossFrame++;
        if(bossFrame===7){
          bossTime = 0;
          phase = 2;
        }
      }
      else moveAndDisplayObstacles(); //error
    }

    if (phase === 2){
      //boss gameplay phase
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
      //end of boss
      //check that all circles are gone
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
        obstacles.push(new Obstacle(rockImage, "obstacle"));
      }
      // increase speed of game element overtime
      if (frameCount % 20 === 0) {
        rock.speed += speedIncrease;
        burger.speed += speedIncrease;
        jam.speed += speedIncrease;
      }
      moveAndDisplayObstacles();
    }
  }

  //main menu
  if (shopClicked) {
    displaySquare();
  }

  if (homeClicked) {
    displayTriangle();
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
    if (keyIsDown(RIGHT_ARROW) && this.x < width / 1.4) {
      this.x += 20;
    }
    if (keyIsDown(LEFT_ARROW) && this.x > 150) {
      this.x -= 20;
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

class Character2{
  constructor(){
    this.x = width / 1.4;
    this.y = 200*2;  
  }
  move() {
    if (keyIsDown(UP_ARROW) && this.y > spongeLane && !this.isKeyPressed) {
      this.y -= spongeLane;
      this.isKeyPressed = true; // Set to true when moving
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height-spongeLane && !this.isKeyPressed) {
      this.y += spongeLane;
      this.isKeyPressed = true; // Set to true when moving
    }

    // Reset when the key is released
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
      this.isKeyPressed = false;
    }
  }
  display(){
    image(sAnimation[int(frameCount/10) % 4], this.x, this.y-sAnimation[0].height/2, 306, 295);
  }
}

class Food{
  constructor(image, type){
    this.image = image;
    this.type = type;
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

class Power extends Food{
  display(){
    image(this.image[int(frameCount/10) % 4], this.x, this.y);
  }
}

class Obstacle extends Food{
  constructor(image){
    super(image)
    this.y = random(lanes);
    if(collectibles.length > 0){
      while(dist(0, this.y, 0, collectibles[collectibles.length-1].y) < image.height){
        this.y = random(lanes);
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
    //collide
    if (collideRectCircle(sponge.x + 63, sponge.y - 135, 170, 200,
      circles[i].x, circles[i].y, circles[i].radius * 2)){
      playerLoses = true;
    }
  }
}

function moveAndDisplayObstacles(){
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].display();
    obstacles[i].update();
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
    //collide
    if (collideRectRect(sponge.x + 63, sponge.y - 135, 170, 200,
      obstacles[i].x, obstacles[i].y + 10, 337, 228)){
      playerLoses = true;
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
      if (collectibles[i].type === "burger"){
        if (theDouble) score += 2;
        else score += 1; //increase burger score
      }
      else if (collectibles[i].type === "jam"){
        if (theDouble) jamScore += 2;
        else jamScore += 1; //increase jam score
      }
      else if (collectibles[i].type === "double"){
        theDouble = true;
        doubleTime ++;
        if (powerTime === 500){
          doubleTime = false;
          doubleTime = 0;
        }
      }
      collectibles.splice(i, 1);
    }
  }
}

function pushingCollectibles(){
  // Add new burgers at regular intervals
  if (frameCount % collectiblesInterval === 0) {
    collectibles.push(new Food(burgerImage, "burger"));
  }
  // Add jams rarely
  if(random(1000)< 1){
    collectibles.push(new Food(jamImage, "jam"));
  }
  // Add powerups randomly
  if (frameCount % collectiblesInterval === 0) {
    collectibles.push(new Power(double, "double"));
  }
}

function keyPressed(){
  if (keyCode === 49) phase = 1;
  if (keyCode === 50) phase = 2;
  if (keyCode === 51) phase = 3;
  if (keyCode === 52) phase = 4;
  if (keyCode === 53) phase = 5;
}

function mousePressed() {
  let menuX = width / 6;
  let menuY = height / 4;
  let menuWidth = width / 1.5;
  let menuHeight = height / 2.1;
  let buttonWidth = menuWidth - 100;
  let buttonHeight = 60;
  if (playerLoses) {
    if (
      mouseX > menuX + 50 &&
      mouseX < menuX + 50 + buttonWidth &&
      mouseY > menuY + 130 &&
      mouseY < menuY + 130 + buttonHeight
    ) {
      // Play again option
      resetGame();
    } else if (
      mouseX > menuX + 50 &&
      mouseX < menuX + 50 + buttonWidth &&
      mouseY > menuY + 230 &&
      mouseY < menuY + 230 + buttonHeight
    ) {
      // Shop option
      shopClicked = true;
      homeClicked = false; // Ensure only one shape is displayed at a time
    } else if (
      mouseX > menuX + 50 &&
      mouseX < menuX + 50 + buttonWidth &&
      mouseY > menuY + 330 &&
      mouseY < menuY + 330 + buttonHeight
    ) {
      // Home option
      homeClicked = true;
      shopClicked = false; // Ensure only one shape is displayed at a time
    }
  }
}

function displayMenu() {
  let menuX = width / 6;
  let menuY = height / 4;
  let menuWidth = width / 1.5;
  let menuHeight = height / 2.1;

  fill(50, 150, 200);
  rect(menuX, menuY, menuWidth, menuHeight, 20);

  fill(0);
  textSize(96);
  text("You Lose!", width / 2, menuY + 70);

  let buttonWidth = menuWidth - 100;
  let buttonHeight = 60;

  fill(100, 200, 100);
  rect(menuX + 50, menuY + 130, buttonWidth, buttonHeight, 10);
  fill(0);
  textSize(48);
  text("Play Again", menuX + buttonWidth / 2 + 50, menuY + 165);

  fill(100, 200, 100);
  rect(menuX + 50, menuY + 230, buttonWidth, buttonHeight, 10);
  fill(0);
  textSize(48);
  text("Shop", menuX + buttonWidth / 2 + 50, menuY + 265);

  fill(100, 200, 100);
  rect(menuX + 50, menuY + 330, buttonWidth, buttonHeight, 10);
  fill(0);
  textSize(48);
  text("Home", menuX + buttonWidth / 2 + 50, menuY + 365);
}

// Display a square for Shop option
function displaySquare() {
  background(240);
  fill(100, 200, 100);
  rect(width / 2 - 50, height / 2 - 50, 100, 100);
}

// Display a triangle for Home option
function displayTriangle() {
  background(240);
  fill(100, 200, 100);
  triangle(
    width / 2,
    height / 2 - 50,
    width / 2 + 50,
    height / 2 + 50,
    width / 2 - 50,
    height / 2 + 50
  );
}

function resetGame() {
  // Clearing arrays
  obstacles = [];
  collectibles = [];

  //return spongeBob to the center
  sponge.x = width / 1.4;
  sponge.y = height / 2;

  //reset speed of game
  rock.speed = 10;
  burger.speed = 10;
  jam.speed = 10;

  // Start a new game
  phase = 4;
  score = 0;
  jamScore = 0;
  overallScore = 0;
  overallJamScore = 0;
  playerLoses = false;
  shopClicked = false; // Reset Shop click state
  homeClicked = false; // Reset Home click state
}