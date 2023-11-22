// Colos demo
// Raghad Ibrahim
// Oct 25, 2023
let rectWidth = 50;
let rectHeight = 10;
let colors = ["#EAA8A9", "#DFAEA9", "#BBA8A2", "#9FA19E", "#649695"];
                //"#514CC"  base16
                //RRGGBBB   0123456789ABCDEF

function setup() {
  createCanvas(windowWidth, windowHeight);
    drawRGB(width*0.1)    //RGB
    drawHSB(width*0.4)    //HSB
    drawCustom(width*0.7)    //Custom
}

function drawRGB(x){
  colorMode(RGB);  //0-255
  noStroke();
  for(let y=0; y<height; y+=rectHeight){
    fill(random(255), random(255), random(255));
    rect(x, y, rectWidth, rectHeight);
  }
}

function drawHSB(x){
  colorMode(HSB);
  for(let y=0; y<height; y+=rectHeight){
    fill(y/3%360,360, 360); //max S and B
    //once y hits 360, it uses the 360 value.
    //using remainder solves the problem.
    rect(x, y, rectWidth, rectHeight);
  }
}

function drawCustom(x){
  colorMode(RGB);
  let index = 0;
  for(let y=0; y<height; y+=rectHeight){
    //Option 1: Cycle through Palette
    fill(colors[index%5]);

    //Option 2: RAndom color selection
    fill(colors[Math.floor(random(colors.length))])
    rect(x, y, rectWidth, rectHeight);
    index++; 
  }
}

