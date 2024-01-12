// Final Project
// Raghad Ibrahim
// Date

// they are still overlapping
// create certian lanes for collectibles.
// why is it crashing when speed is increased
// how to reset speed of game
// new boss error
// when I pause the game for too long, objects move very fast
// speed is not really increasing since its increasing each object seperatly
// boss circles appear suddenly

//  menue
let pausedTime = 0;
let adjustedFrameCount = 0;
let playerLoses = 0;
// 0 is spongeBob is alive
// 1 dispalys dying animation
// 2 displays dying menu(home or replay)
let pauseState = 0;
// 0 is no pause menu
// 1 is the count down after pressing resume
// 2 display pause menu
let loseMenu = false;
let shopClicked = false; // Track if Shop option is clicked
let homeClicked = false; // Track if Home option is clicked

let phase = 4;
let sAnimation = []; // Array to hold sponge animation frames
let bImage;  //background
let bImage2;  // boss background
let homeImage;
let sponge;
let collectibles = [];
let obstacles = [];
let burgerImage;
let jamImage;
let rockImage;
let collectiblesInterval = 50;
let obstacleInterval = 100;
let lanes = [0, 270, 270*2, 270*3];
let spongeLane = 270;
let jamInterval = 80;
let speedIncrease = 0.1;

// power ups
let double = [];
let shield = [];
let magnet = [];
let theDouble = false;
let theShield = false;
let theMagnet = false;
let doubleTime = 0;
let shieldTime = 0;
let magnetTime = 0;
let powerInterval = 500;

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

// spongebob's dying array
let dying = [];
let dyingFrame = 0; 

// count douwn animation
let countDown = [];
let countDownFrame = 0;

function preload() {
  bImage = loadImage("assets/backg1.png");
  bImage2 = loadImage("assets/backg2.png");
  burgerImage = loadImage("assets/4.png");
  jamImage = loadImage("assets/5.png");
  rockImage = loadImage("assets/rock.png");
  homeImage = loadImage("assets/home.png");
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
  // dying animation
  for (let i = 0; i < 5; i++) {
    dying.push(loadImage("assets/dying/" + i + ".png"));
  }
  // count down animation
  for (let i = 3; i > 0; i--) {
    countDown.push(loadImage("assets/count" + i + ".png"));
  }
}

function setup() {
  createCanvas(1920, 1080);
  sponge = new Character();
}

function draw() {
  //morning background
  if (phase === 4){
    imageMode(CENTER);
    image(bImage, width/2, height/2);
    imageMode(CORNER);
    drawPauseIcon();
  }
  //switch to night background when boss enters
  else{
    imageMode(CENTER);
    image(bImage2, width/2, height/2);
    imageMode(CORNER);
    drawPauseIcon();
  }
  if (playerLoses === 1){
    if (dyingFrame < dying.length * 10){
      // Display the dying animation for 40 frames
      image(dying[int(dyingFrame / 10) % dying.length], sponge.x, sponge.y - dying[0].height / 2, 306, 295);
      dyingFrame++;
    }
    else {
      playerLoses = 2;
      dyingFrame = 0;
    }
  }
  if (playerLoses === 2){
      // After the dying animation, display the menu
      loseMenu = true;
      textAlign(CENTER, CENTER);
      displayMenu();
    }
  else{ 
    //normal game code
    adjustedFrameCount = frameCount - pausedTime;
    textAlign(LEFT, BASELINE);
    sponge.display();
    sponge.move();
    sponge.gravity();
    fill(0);
    textSize(60);
    text(score, 1670, 90);
    text(jamScore, 1670, 213);
    pushingCollectibles();
    moveAndDisplayCollectibles();
    PowerupsTiming();

    if (phase === 1){
      //clearing obstacles before boss enters
      if(obstacles.length === 0){
        image(startBoss[bossFrame], 0, 250);
        // prevent boss from moving when game paused
        if(playerLoses === 0 && pauseState === 0){
          if(frameCount%7===0)bossFrame++;
          if(bossFrame===7){
            bossTime = 0;
            phase = 2;
          }
        }
      }
      else moveAndDisplayObstacles();
    }

    if (phase === 2){
      //boss gameplay phase
      image(bossAnimation[int(frameCount/10) % 6], 0, 250);
      moveAndDisplayCircles();
      // check that game isn't paused or player lost
      if(pauseState === 0 && pauseState === 0){
        if (adjustedFrameCount % 70 === 0) {
          circles.push(new MovingCircles());
        }
        bossTime++;
        if (bossTime === 500) {
          phase = 3;
          bossFrame = 0; 
        }
      }
    }

    if (phase === 3){
      //end of boss
      //check that all circles are gone
      if (bossFrame < 7){
        image(endBoss[bossFrame], 0, 250);
        moveAndDisplayCircles();
      }
      // check that game isn't paused or player lost
      if(playerLoses === 0 && pauseState === 0){
        if(frameCount%7===0)bossFrame++;
        if(bossFrame>=7){
          if (circles.length === 0){
            phase = 4;
            bossFrame = 0; 
          }
          else moveAndDisplayCircles();
        }
      }
    }

    if (phase === 4){
      // Add new obstacles at regular intervals
      if(pauseState === 0){
        if (frameCount % obstacleInterval === 0) {
          obstacles.push(new Obstacle(rockImage, "obstacle"));
        }
        pausedTime = 0; // Reset the paused time when the game is unpaused
      }
      moveAndDisplayObstacles();
    }

    // checking if game is paused
    if (pauseState === 2 && playerLoses === 0){
      pausedTime = millis(); // Record the time when the game is paused
      textAlign(CENTER, CENTER);
      displayPauseMenu();
    }
    if (pauseState === 1){
      if (countDownFrame < countDown.length * 15){
        // Display the countDown animation for 40 frames
        imageMode(CENTER);
        image(countDown[int(countDownFrame / 15) % countDown.length], width/2, height/2);
        countDownFrame++;
        imageMode(CORNER);
      }
      else {
        pauseState = 0;
        countDownFrame = 0;
      } 
    }
  }

  //main menu
  if (shopClicked) {
    displaySquare();
  }

  if (homeClicked) {
    displayHome();
  }
}

class Character{
  constructor(){
    this.x = width / 1.4;
    this.y = height / 2; 
    this.g = height / 2;
  }
  move(){
    if (playerLoses === 0 && pauseState === 0){
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
  }
  gravity(){
    if (playerLoses === 0){
      if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)){
        if(this.y > this.g) this.y-=15;
        if(this.y < this.g) this.y+=15;
      }
    }
  }
  display(){
    if (playerLoses === 0){
      image(sAnimation[int(frameCount/10) % 4], this.x, this.y-sAnimation[0].height/2, 306, 295);
      if (theShield === true){
        noStroke();
        fill(252, 186, 3, 100);
        imageMode(CENTER);
        ellipse(this.x + 150, this.y, 320, 330);
        imageMode(CORNER);
      }
    }
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
  update(){
    if (theMagnet && playerLoses === 0 && pauseState === 0 && 
      this.type !== "obstacle" && this.type !== "double" &&
      this.type !== "shield" && this.type !== "magnet"){
      if(this.x < sponge.x) this.x += this.speed *1.3;
      if(this.x > sponge.x) this.x -= this.speed *1.3;
      if(this.y < sponge.y) this.y += this.speed *1.3;
      if(this.y > sponge.y) this.y -= this.speed *1.3;
    }
    else{
      if (playerLoses === 0 && pauseState === 0){
        this.x += this.speed;
      }
    }
    this.speedUp();
  }
  speedUp(){
  // increase speed of game element overtime
    if(playerLoses === 0 && pauseState === 0){
      if (frameCount % 20 === 0 && this.speed < 40){
        this.speed += speedIncrease;
      }
    }
  }
  offscreen(){
  return this.x > width; // returns true if offscreen
  }
}

class Power extends Food{
  constructor(image, type){
    super(image, type);
    this.x = -image[0].width;
  }
  display(){
    image(this.image[int(frameCount/10) % 4], this.x, this.y);
  }
}

class Obstacle extends Food{
  constructor(image, type){
    super(image, type);
    this.y = random(lanes);
    // if(collectibles.length > 0){
    //   while(collideRectRect(this.x, this.y, 337, 228, 
    //   collectibles[collectibles.length-1].x, collectibles[collectibles.length-1].y, 100, 82)){
    //     this.y = random(lanes);
    //   }
    // }
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
    if (playerLoses === 0 && pauseState === 0){
      let n = noise(this.time);
      this.x += this.speed;
      this.y += map(n, 0, 1, -10, 10);
      this.time += 0.01;
    }
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
    //collide
    if (collideRectCircle(sponge.x + 63, sponge.y - 135, 170, 200,
      circles[i].x, circles[i].y, circles[i].radius * 2)){
      playerLoses = 1;
    }
    if (circles[i].isOffScreen()) { //on eof the challengse
      circles.splice(i, 1);
    }
  }
}

function moveAndDisplayObstacles(){
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].display();
    obstacles[i].update();
    //collide
    if (theShield === false){
      if (collideRectRect(sponge.x + 65, sponge.y - 135, 170, 200,
      obstacles[i].x, obstacles[i].y + 10, 337, 228)){
        playerLoses = 1;
      }
      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }
  }
}

function moveAndDisplayCollectibles(){
  for (let i = collectibles.length - 1; i >= 0; i--) {
    collectibles[i].display();
    collectibles[i].update();
    //collide
    if (collideRectRect(sponge.x + 65 , sponge.y - 135, 170, 150, 
    collectibles[i].x, collectibles[i].y, 100, 82)){
      if (collectibles[i].type === "burger"){
        if (theDouble) {
          score += 2;
          overallScore +=2;
        }
        else{
          score += 1; //increase burger score
          overallScore += 1;
        }
      }
      else if (collectibles[i].type === "jam"){
        if (theDouble) {
          jamScore += 2;
          overallJamScore +=2;
        }
        else {
          jamScore += 1; //increase jam score
          overallJamScore +=1;
        }
      }
      else if (collectibles[i].type === "double"){
        theDouble = true;
      }
      else if (collectibles[i].type === "shield"){
        theShield = true;
      }
      else if (collectibles[i].type === "magnet"){
        theMagnet = true;
      }
      collectibles.splice(i, 1);
      i --;
      if (i<0) break;
    }
    // If collectible is off the screen, remove it from the array
    if (collectibles[i].offscreen()){
      collectibles.splice(i, 1);
      i --;
    }
  }
}

function pushingCollectibles(){
  if(pauseState === 0){
    // Add new burgers at regular intervals
    if (frameCount % collectiblesInterval === 0) {
      collectibles.push(new Food(burgerImage, "burger"));
    }
    // Add jams rarely
    if(random(1000)< 1){
      collectibles.push(new Food(jamImage, "jam"));
    }
    // Add powerups randomly
    let randomNumber = Math.floor(random(0,4));
    if (frameCount % powerInterval=== 0 && randomNumber === 1){
      collectibles.push(new Power(double, "double"));
    }
    if (frameCount % powerInterval === 0 && randomNumber === 2){
      collectibles.push(new Power(shield, "shield"));
    }
    if (frameCount % powerInterval === 0 && randomNumber === 3){
      collectibles.push(new Power(magnet, "magnet"));
    }
  }
}

function PowerupsTiming(){
  if (playerLoses === 0 && pauseState === 0){
    if(theDouble === true){
      doubleTime ++;
      if (doubleTime === 500){
        theDouble = false;
        doubleTime = 0;
      }
    }
    if(theShield === true){
      shieldTime ++;
      if (shieldTime === 500){
        theShield = false;
        shieldTime = 0;
      }
    }
    if(theMagnet === true){
      magnetTime ++;
      if (magnetTime === 500){
        theMagnet = false;
        magnetTime = 0;
      }
    }
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
  // lose and pause menu variables
  let menuX = width / 6;
  let menuY = height / 4;
  let menuWidth = width / 1.5;
  let menuHeight = height / 2.1;
  let buttonWidth = menuWidth - 100;
  let buttonHeight = 150;

  // Check for mouse click on the pause icon
  if (mouseX > 60 && mouseX < 115 && mouseY > 20 && mouseY < 80){
    pauseState = 2;
  }

  if (
    mouseX > menuX + 50 &&
    mouseX < menuX + 50 + buttonWidth &&
    mouseY > menuY + 130 &&
    mouseY < menuY + 130 + buttonHeight
  ) {
    // Play again option
    if (loseMenu) resetGame();
    // resume option
    else if (pauseState === 2){
      pauseState = 1;
    }
  }

  else if (
    mouseX > menuX + 50 &&
    mouseX < menuX + 50 + buttonWidth &&
    mouseY > menuY + 330 &&
    mouseY < menuY + 330 + buttonHeight
  ) {
    // Home option
    if(pauseState === 2 || loseMenu){
      homeClicked = true;
      shopClicked = false; // Ensure only one shape is displayed at a time
    }
  }

  // Home screen menu variables
  let playRectX = width / 12;
  let playRectY = height / 2.5;
  let shopRectX = width / 12;
  let shopRectY = height / 2.5 + 170;
  let rectWidth = 300;
  let rectHeight = 150;

  // Check for mouse click on "Play" rectangle
  if (
    mouseX > playRectX &&
    mouseX < playRectX + rectWidth &&
    mouseY > playRectY &&
    mouseY < playRectY + rectHeight
  ) {
    resetGame();
    homeClicked = false;
    shopClicked = false;
  }

  // Check for mouse click on "Shop" rectangle
  if (
    mouseX > shopRectX &&
    mouseX < shopRectX + rectWidth &&
    mouseY > shopRectY &&
    mouseY < shopRectY + rectHeight
  ) {
    // Handle "Shop" button click
    // Add your code for "Shop" button action here
    console.log("Shop button clicked!");
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
  let buttonHeight = 150;

  textSize(70);
  fill(100, 200, 100);
  rect(menuX + 50, menuY + 130, buttonWidth, buttonHeight, 10);
  rect(menuX + 50, menuY + 330, buttonWidth, buttonHeight, 10);
  fill(0);
  text("Play Again", menuX + buttonWidth / 2 + 50, menuY + 210);
  text("Home", menuX + buttonWidth / 2 + 50, menuY + 410);
}

function displayPauseMenu() {
  let menuX = width / 6;
  let menuY = height / 4;
  let menuWidth = width / 1.5;
  let menuHeight = height / 2.1;

  fill(50, 150, 200);
  rect(menuX, menuY, menuWidth, menuHeight, 20);

  let buttonWidth = menuWidth - 100;
  let buttonHeight = 150;

  textSize(70);
  fill(100, 200, 100);
  rect(menuX + 50, menuY + 130, buttonWidth, buttonHeight, 10);
  rect(menuX + 50, menuY + 330, buttonWidth, buttonHeight, 10);
  fill(0);
  text("Resume", menuX + buttonWidth / 2 + 50, menuY + 210);
  text("Quit", menuX + buttonWidth / 2 + 50, menuY + 410);
}

function displaySquare() {
  background(240);
  fill(100, 200, 100);
  rect(width / 2 - 50, height / 2 - 50, 100, 100);
}

function displayHome() {
  imageMode(CENTER);
  image(homeImage, width / 2, height / 2);
  imageMode(CORNER);
  textAlign(LEFT, BASELINE);
  fill(0);
  textSize(60);
  text(overallScore, 1670, 90);
  text(overallJamScore, 1670, 213);

  // Dark purple rectangles
  fill(75, 0, 130); // Dark purple color
  rect(width / 12, height / 2.5, 300, 150, 10); // Top rectangle
  rect(width / 12, height / 2.5 + 170, 300, 150, 10); // Bottom rectangle

  // Text on rectangles
  fill(255);
  textSize(70);
  textAlign(CENTER, CENTER);
  text("Play", width / 12 + 150, height / 2.5 + 75); // "Play" text
  text("Shop", width / 12 + 150, height / 2.5 + 245); // "Shop" text
}

function drawPauseIcon() {
   fill(0);
   rect(60, 20, 15, 60); // Vertical bar
   rect(100, 20, 15, 60); // Vertical bar
}

function resetGame(){
  // Clearing arrays
  obstacles = [];
  collectibles = [];

  //return spongeBob to the center
  sponge.x = width / 1.4;
  sponge.y = height / 2;

  // Start a new game
  phase = 4;
  score = 0;
  jamScore = 0;
  playerLoses = 0;
  countDownFrame = 0; // Reset count down
  bossFrame = 0; // reset boos animation frames
  shopClicked = false; // Reset Shop click state
  homeClicked = false; // Reset Home click state

  // Reset powerUps to false
  theDouble = false;
  theShield = false;
  theMagnet = false;

  // Reset menues to false
  loseMenu = false;
  pauseState = 0;
}