let bossAnimation = [];
let startabnoss = [];
let circles = [];
let villain;
function preload() {
  for (let i = 0; i < 7; i++) {
    startabnoss.push(loadImage("assets/" + i + ".png"));
  }
  for (let i = 6; i < 12; i++) {
    bossAnimation.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(1920, 1080);
  frameRate(10);
  image(startabnoss[frameCount % 7], 0, 250);
}

function draw() {
  background(220);
  if (frameCount % 10 === 0) {
    circles.push(new MovingCircles());
  }
  moveAndDisplayCircles();
  image(bossAnimation[frameCount % 6], 0, 250);
}

class MovingCircles{
  constructor(){
    this.y = height/2;
    this.x = 200;
    this.speed = 20;
    this.radius = 30;
  }
  update() {
    this.x += this.speed;
    this.y += map(noise(this.x * 0.01, this.y * 0.01), 0, 1, -100, 100);
  }

  display() {
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  isOffScreen() {
    return this.x > width + this.radius;
  }
}

function moveAndDisplayCircles() {
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();

    if (circles[i].isOffScreen()) {
      circles.splice(i, 1);
    }
  }
}
