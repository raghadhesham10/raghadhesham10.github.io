// Objects and Classes Intro
// Raghad Ibrahim
// Oct 2, 202
//Random Walker class + mulitple objects

//Global VAriables
let w; 
let w2; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  let randColor = color(random(255),random(255),random(255) )
  w = new Walker(width/2, height/2, randColor)
  w2 = new Walker(width/2, height/2, randColor)
}

function draw() {
  background(220);
  w.move();
  w.display();
  w2.move();
  w2.display();
}

class Walker{
  //class constructor and properties
  constructor(x, y, c){
    this.x = x; 
    this.y = y; 
    this.c = c; //c is color 
    this.size = 10;
    this.speed= 10;
  }

  //Class method
  move(){//move up, down, left, right
    let moveChoice = Math.floor(random(0,4));
    if (moveChoice===0) this.y -= this.speed;
    else if (moveChoice===1) this.y += this.speed;
    else if (moveChoice===2) this.x -= this.speed;
    else this.x += this.speed;

  }
  display(){
    rectMode(CENTER);
    fill(this.c);
    square(this.x, this.y, this.size)
  }
}
