// Recaman Sequence
// Raghad Ibrahim
// Nov 14, 2023
// Rules for sequence
//    start at zero.
//    every step you take is 1 bigger than the last one.

//let cX = 0;

let sequence = [];
let stepAmount = 1;
let currentValue = 0;

let largerst = 0; 
let scaleAmount = 0;
let arcList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noFill();
}

function addToSequence(){
  //generate the next number in the Recaman Sequence
  let backwards = currentValue - stepAmount;
  if(backwards > 0 && !sequence.includes(backwards)){
    //do some drawing stuff here...
    arcList.push(new rArc(currentValue,backwards, sequence.legth%2));
    sequence.push(backwards);
    currentValue = backwards;
    stepAmount++;
  }
  else{ //next number is forward instead
    let forwards = currentValue + stepAmount;
    //do some drawing stuff here...
    arcList.push(new rArc(currentValue,forwards, sequence.legth%2));
    sequence.push(forwards);
    currentValue = forwards;
    stepAmount++;
  }
}

function draw() {
  background(0);
  translate(0, height/2);
  addToSequence();
}

function renderArcs(){
  for(let r of arcList){
    r.display();
  }
}

class rArc{
  constructor(start, end, direction){
    this.start = start; this.end = end;
    this.direction = direction; //0- forward: upper arc
                                //1- backward: lower arc
  }

  display(){
    let diameter = ab(this.start - this.end);
    let x = (this.start - this.end) / 2; //centerpoint
    strokeWeight(0,5);
    if (this.direction ===0){ //forward
      arc(x, 0, diameter, diameter, 0, PI)
    }
    else{ //backward
      arc(x, 0, diameter, diameter, PI, 0);
    }
  }
}
