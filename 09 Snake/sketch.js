// Snake Mechanics
// Raghad Ibrahim
// oct 11, 2023
// PRACTICE IN WORKING WITH CALSSES AND ARRAYS (SNAKE)

//Global Variables
let points = []; //snake coordinates
let speed = 6; //snake speed
let snakeLegth = 30;
let snakeLocation; //a Pont for the where the head is
function setup() {
  createCanvas(windowWidth, windowHeight);
  snakeLocation = new Point(width/2, height/2);
  strokeWeight(15);
  initSnake();
}

function initSnake(){
  //place in a bunsh of starting points
  for(let i=0; i < snakeLegth; i++){
    points.push(createPoint());
  }
}

function createPoint(){
  //return a new Point object
  if(keyCode===UP_ARROW)snakeLocation.y -= speed;
  else if (keyCode===DOWN_ARROW) snakeLocation.y += speed;
  else if (keyCode===LEFT_ARROW) snakeLocation.x -= speed;
  else if (keyCode===RIGHT_ARROW) snakeLocation.x += speed;
  //if a diffeent coded key was pressed, no change
  return new Point(snakeLocation.x, snakeLocation.y);
}

function draw() {
  background(220);
  moveAndDisplay();
}

function moveAndDisplay(){
  //loop through the array, and connect all 
  for(let i= 0; i<points.length-1; i++){
    let cur = points[i]; //point .x .y
    let next = points[i+1];
    let alpha = map(i,0,points.length-1,0,255);
    stroke(0,alpha);
    line(cur.x, cur.y, next.x, next.y);
  }

  points.splice(0,1); //deletes elements 0
  points.push(createPoint());
}

class Point{ //a class for an (x,y) point
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}