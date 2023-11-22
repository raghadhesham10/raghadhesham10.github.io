// Project Title
// Raghad Ibrahim
// Oct 4, 2023
// Some simple Animations using 
// random() and noise()

//Global variables
let segL = 10;
let ballY = 200;
let ySpeed; 
let radiusTime = 40;
let ySpeedTime = 10; 
let greyValueTime = 0;
let noiseShift = 0.05; 


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //temporary to make viewing easier 
}
function segmentLine(){
  strokeWeight(15);
  //using a loop, draw one line made up of many 
  let x=0;//loop variable
  while(x<width){
    //option1: random()
    let greyValue = random(0,255);
    //option2 : noise()
    greyValue = noise(greyValueTime);
    greyValue = map(greyValue, 0, 1, 0, 225);
    greyValueTime += noiseShift; 


    stroke(greyValue);
    line(x, height/2, x+segL, height/2);
    x += segL;
  }
}

function rectangleOnLine(){
  //draw a single rounded rectangle on the line
  //option 1: random()
  let radius = random(2,70);
  //option 2: noise()
  radius = noise(radiusTime);
  radius = map(radius, 0, 1, 2, 70);
  radiusTime += noiseShift; 
  rectMode(CORNERS);
  strokeWeight(2);
  stroke(0);

  rect(width*0.1, height/2, width*0.5, height*0.25,radius);
}

function moveBall(){
  //option 1: random()
  ySpeed = random(-20,20);
  //option 2: noise()
  ySpeed = noise(ySpeedTime);
  ySpeed = map(ySpeed, 0, 1, -20, 20);
  ySpeedTime += noiseShift;
  ballY += ySpeed;
  circle(width*0.7, ballY, 30)
}

function draw() {
  background(220);
  segmentLine();
  rectangleOnLine();
  moveBall();
}
