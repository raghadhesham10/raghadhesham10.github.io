let bossAnimation = [];
let startboss = [];
let circles = [];
let villain;
function preload() {
  for (let i = 0; i < 7; i++) {
    startboss.push(loadImage("assets/" + i + ".png"));
  }
  for (let i = 6; i < 12; i++) {
    bossAnimation.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(1920, 1080);
  image(startboss[frameCount % 7], 0, 250);
}

function draw() {
  background(220);
  if (frameCount % 70 === 0) {
    circles.push(new MovingCircles());
  }
  moveAndDisplayCircles();
  image(bossAnimation[int(frameCount/10) % 6], 0, 250);
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
    let n = noise(this.time);
    this.x += this.speed;
    this.y += map(n, 0, 1, -10, 10);
    this.time += 0.01;
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

    if (circles[i].isOffScreen()) {
      circles.splice(i, 1);
    }
  }
}
