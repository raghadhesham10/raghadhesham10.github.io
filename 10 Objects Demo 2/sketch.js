// Objects Demo 2
// Raghad Ibrahim
// October 13, 2023
// OOP Recap + object-object interactions

//Global Variables
let points=[];
let reach =150; //MAX line length

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for(let p of points){
    p.move();
    p.display();
    p.connectPoints(points);
  }
}

function mouseClicked(){
  //trigger on a full press/release mouse interaction
  points.push(new MovingPoint(mouseX, mouseY));
}

class MovingPoint{
  //construcor (sets up the cass variables)
  //Only runs once
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.s = 20; //size
    this.c = color(random(255), random(255), random(255));
    this.xTime = random(10);
    this.yTime = random(10);
    this.timeShift = 0.01;
    this.maxSpeed = 5;
  }

  //class functions
  //don't use function word inside a class
  display(){
    fill(this.c);
    noStroke();
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < reach){
      this.s= map(d,0,reach, 60, 20);
    }
    circle(this.x, this.y, this.s);

  }
  connectPoints(pointArray){
    //check if any other points are nearby. If so,
    //conncet with a line
    //this.x this.y
    stroke(this.c)
    for(let p of pointArray){ //make sure p is not myself
      if(p !== this){
        let d = dist(this.x, this.y, p.getX(), p.getY())
        if(d < reach){
          line(this.x, this.y, p.getX(), p.getY());
        }

      }
    }
  }

  getX(){return this.x};
  getY(){return this.y};

  move(){
    let xSpeed = noise(this.xTime); //0-1       //-5 to 5
    xSpeed = map(xSpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.xTime+= this.timeShift;
    this.x += xSpeed;

    //wrap around coding
    if(this.x < 0) this.x += width;
    if(this.x > width) this.x -= width;


  }
}