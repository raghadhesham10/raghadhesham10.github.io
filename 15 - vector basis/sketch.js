// Vector Basis 
// Raghad Ibrahim
// nov 11
// usig vectors for motion (pos, vel, accel) + OOP recap

let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  movers.push(new Mover(mouseX, mouseY));

}
function draw() {
  background(220);
  for(let i =0; i<movers.length; i++){
    let m =movers[i];
    m.move();
    m.display();
    if(m.alive === false)movers.splice
  }
}

class Mover{
  constructor(x,y){
    this.pos = createVector(x,y)  //this.pos.x, this.pos.y
    this.vel = createVector(random(-3, 3), random(-2, -5));
    this.c = color(50, 50, random(150, 255), 150);  //with transparency
    this.gravity = createVector(0, 0.1);
    this.alive = true;
    this.lifetime = Math.floor(random(60, 120));
  }
  //class methods
  move(){
    //update velocity by forces firs
    this.vel.add(this.gravity);
    this.pos.add(this.vel); //then update pos by lev
    this.lifetime--;
    if(this.lifetime===0)this.alive = false;
  }
  display(){
    fill(this.c);
    noStroke();
    push()
    translate(this.x, this.y)
    circle(this.pos.x, this.pos.y, 100)
    pop();

  }
}
