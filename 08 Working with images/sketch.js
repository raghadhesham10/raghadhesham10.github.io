// Working With Images
// Raghad Ibrahim
// October 10, 2023
// Working with images in variables and arrays

//Global Variables
let lionL, lionR; //store Image object in each
let facingLeft = true;
let pinImages = []; //to hold our pinwheel images
let pinIndex = 0; //which image we are going to show

function preload(){
  //happens before setup(). waits for loading to finish
  lionL= loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
  for(i=0; i<9; i++){
    pinImages.push(loadImage("assets/pin-0"+i+".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  //frameRate(10); //global attribute (affects lion)
  //never load picinside of set up 
}

function draw() {
  background(220);
  //drawLion();
  drawpin();
}

function drawpin(){
  //animate our pinwheel images
  image(pinImages[pinIndex], width/2, height/2);
  if(frameCount % 2 ===0 ){ //loading the pic every second frame
    pinIndex ++;
    if(pinIndex > 8) pinIndex =0;
  }

}

function drawLion(){
  //draw the lion in direction mouse moves
  if (movedX<0) facingLeft = true;
  else if(movedX>0) facingLeft = false;
  if(facingLeft){
    image(lionL, mouseX, mouseY, lionL.width*0.6, lionR.height*0.6);
  }
  else{
    image(lionR, mouseX, mouseY);
  }
}
