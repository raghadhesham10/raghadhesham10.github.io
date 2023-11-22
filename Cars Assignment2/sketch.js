// Cars 
// Raghad Ibrahim 
// Oct 17, 2023
// Expalin

//Global Variables
let trafficLight;
let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create 20 vehicles going east
  for (let i = 0; i < 20; i++) {
    eastbound.push(new Vehicle(width / 2, 1));
  }
  // Create 20 vehicles going west
  for (let i = 0; i < 20; i++) {
   westbound.push(new Vehicle(width / 2, 0));
  }
  trafficLight = new Traffic();
}


function draw() {
  background(220);
  drawRoad();
  trafficLight.display();
  trafficLight.update();
  for (let v of eastbound) {
    v.action();
  }
  for (let v of westbound) {
    v.action();
  }
}

function mousePressed(){
  //if I press shift once it will always add here?
  if(mouseButton === LEFT && keyIsPressed && keyCode === SHIFT ){
    print(1)
    westbound.push(new Vehicle(width / 2, 0));
  }
  else if(mouseButton === LEFT){
    eastbound.push(new Vehicle(width / 2, 1));
  }
}

function drawRoad() {
  fill(0);
  rect(0, height / 4, width, height / 4 + height / 4);
  for (let i = 0; i < width; i = i + 20) {
    stroke(220);
    line(i, height / 2, i + 8, height / 2);
  }
}


class Traffic{
  constructor(){
    this.red = false;
    this.timer = 120; //how long the cars stop
  }
  display(){
    fill(255);
    rect(width - 150, height/14, 100, 100)
    if(this.red === false) fill("green");
    else fill("red");
    circle(width - 100, height/8, 80);
  }
  update(){
    if (keyIsPressed && key===" "){
      this.red = true;
      this.timer = 120; 
    }
    if (this.red === true){
      this.timer-=1;
      if (this.timer === 0) this.red = false;
    }
  }
  
}

class Vehicle {
  constructor(x, d) {
    this.t = Math.floor(random(0, 2)); //type of car
    this.x = x;
    this.d = d; //direction   0-west  1-east
    if (this.d === 0) { //top lane
      this.y = random(height / 4, height * .45);
    }
    else this.y = random(height *.51, height * .7);

    this.c = color(random(0, 255), random(0, 255), random(0, 255));
    this.xSpeed = random(1, 15); //random speed
  }


  display() {
    if (this.t === 1) {  //truck
      fill(this.c);
      stroke(0);
      rect(this.x, this.y, 50, 25);
      strokeWeight(2);
      if(this.d === 0) line(this.x+10,this.y, this.x+10, this.y +25);
      else line(this.x+40,this.y, this.x+40, this.y +25);
    }
    else {  //car
      fill(this.c);
      stroke(0);
      rect(this.x, this.y, 35, 25);
    }
  }

  move() {
    //checking if the car is going left
    if(trafficLight.red === false){
      if (this.d === 0) {
        if (this.x < 0) this.x = width;
        else {
          this.x -= this.xSpeed;
        }
  
      }
      else {
        if (this.x > width) this.x = 0;
        else {
          this.x += this.xSpeed;
        }
      }
    }
    else{
      this.x = this.x;
    }
  }
  speedUp() {
    //making sure the speed doesn't exceed 15.
    if (this.xSpeed < 15) this.xSpeed += 1;
  }
  speedDown() {
    //making sure speed !== 0 to avoid changing direction.
    if (this.xSpeed > 1 && this.xSpeed < 15) this.xSpeed -= 1;
  }
  changeColor() {
    this.c = color(random(0, 255), random(0, 255), random(0, 255));
    fill(this.c);
  }
  action() {
    this.display();
    this.move();
    // 1 percent chance
    if(trafficLight.red === false){
      if (random(0, 100) < 1) this.speedUp();
      if (random(0, 100) < 1) this.speedDown();
      if (random(0, 100) < 1) this.changeColor();
    }
  }
}

