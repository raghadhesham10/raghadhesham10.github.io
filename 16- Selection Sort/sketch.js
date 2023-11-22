// Selection Sort Demo
// Raghad Ibrahim 
// Nov 3, 2023
// An implementation of the selection sort algorithim


let values = [];
const NUM_VALUES = 20;

function setup() {
  randomSeed(10); //for debugging
  noCanvas();
  populatArray();
  print(values);
  selectionSort();
  print(values);
}

function selectionSort(){
  for(let index = 0; index < values.length-1; index++ ){
    let minimum = values[index];
    let minimumLoc = index; 
    for(let searchIndex = index+1; searchIndex < values.length; searchIndex++){
      let cur = values[searchIndex]
      print(cur, minimum);
      if(cur<minimum){
        minimum = cur;
        minimumLoc = searchIndex;
      }
    }
    //time to swap
    let temp = values[index];
    values[index] = values[minimumLoc];
    values[minimumLoc] = temp;

  }

}

function populatArray(){
  //fill the array with NUM_VALUES  number of items 
  for(let i=0; i< NUM_VALUES; i++){
    values.push(floor(random(1000)))
  }
}
