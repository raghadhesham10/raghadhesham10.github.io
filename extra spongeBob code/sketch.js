class Character2{
  constructor(){
    this.x = width / 1.4;
    this.y = 200*2;  
  }
  move() {
    if (keyIsDown(UP_ARROW) && this.y > spongeLane && !this.isKeyPressed) {
      this.y -= spongeLane;
      this.isKeyPressed = true; // Set to true when moving
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height-spongeLane && !this.isKeyPressed) {
      this.y += spongeLane;
      this.isKeyPressed = true; // Set to true when moving
    }

    // Reset when the key is released
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
      this.isKeyPressed = false;
    }
  }
  display(){
    image(sAnimation[int(frameCount/10) % 4], this.x, this.y-sAnimation[0].height/2, 306, 295);
  }
}