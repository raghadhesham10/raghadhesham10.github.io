// Inheitance Demo
// Raghad Ibrahim
// Nov 29, 2023

let objects = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i< 10; i++){
  objects.push(new AnimatedObject(random(width), random(height)));
  }

  for(let i = 0; i< 10; i++){
    objects.push(new CircleObj(random(width), random(height)));
    }

  for(let i = 0; i< 10; i++){
    objects.push(new LineObject());
  }
}

function draw() {
  background(220);
  for(let o of objects){
    o.move();
    o.display();
  }
}

//"parent" or "super" class
class AnimatedObject{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 1;
  }

  move(){
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }

  display(){
    strokeWeight(4);
    point(this.x, this.y);
  }
}

// Child Class #1
class CircleObj extends AnimatedObject{
  constructor(x, y){
    super(x, y); //CALL THE PARENT CLASS' INSTRUCTOR
    this.size = random(20, 40);
  }

  display(){
    strokeWeight(2);
    circle(this.x, this.y, this.size);
  }
}

// Child Class #2
class LineObject extends AnimatedObject{
  constructor(){
    super(random(width), random(height));
  }
  move(){
    super.move(); //wiggle effect
    this.x += 5;
    if (this.x > width) this.x = 0;
  }

  display(){
    if(mouseIsPressed) strokeWeight(10);
    else strokeWeight(2);
    line(this.x, this.y, this.x + 15, this.y);
  }
}