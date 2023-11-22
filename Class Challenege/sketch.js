// Round Racers
// Raghad Ibrahim
// Oct 3, 2023


//Global Variables
let r;
let r2;
let r3;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //creating different colors for all three crircles.
  let randColor = color(random(255),random(255),random(255));
  let randColor2 = color(random(255),random(255),random(255));
  let randColor3 = color(random(255),random(255),random(255));
  r = new RoundRacers(height/4, randColor );
  r2 = new RoundRacers(height/2, randColor2 );
  r3 = new RoundRacers(height/1.3, randColor3 );

}

function draw() {
  background(220);
  r.move();
  r.display();
  r2.move();
  r2.display();
  r3.move();
  r3.display();

}

class RoundRacers{
  constructor(yPosition, color){
    this.xPosition = 0;
    this.yPosition = yPosition;
    this.color = color; 
    this.xSpeed= Math.floor(random(3,15));
  }
  //class method
  move(){
    //if xPosition is off the right edge of the Canvas, set it back to 0.
    if (this.xPosition > width) this.xPosition = 0; 
    else this.xPosition+=this.xSpeed;

  }
  //class method
  display(){
    fill(this.color);
    circle(this.xPosition, this.yPosition, 75)
  }
}