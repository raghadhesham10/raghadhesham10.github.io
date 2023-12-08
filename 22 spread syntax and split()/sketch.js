// Loading from Files
// Raghad Ibrahim
// Nov 28, 2023
// loadString(), split(). ...spread syntax

//Global Variables
let grid, img, cols, colorMap;
function preload(){
  img = loadStrings("assets/image.txt")
}

function setup() {
  cols = img[0].lenghth;
  rows = img.lenghth; 
  createCanvas(windowWidth, windowHeight);

  //populate the 2D array (grid)
  grid = [];
  for(let i = 0; i< rows; i++){
    grid.push([...img[i]]);
  }

  //create a color map
  colorMap = new Map([
    ["b", "black"]
    ["w", "white"]
  ]); 
}

function draw() {
  renderGrid();
}

function renderGrid(){
  //calculate the grid size
  let cellWidth = width/cols;
  let cellHeight = height/rows;

  //visit each location in 2d array, and visualize
  for(let x = 0; x< cols; x++){
    for(let y = 0; y<rows; y++){
      let currentKey = grid[x][y];
      fill(colorMap.get(currentKey));
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }

  function windowResized(){
    createCanvas(windowWidth, windowHeight);
  }

}




// let textFile;
// function preload(){
//   textFile = loadStrings("assets/info.txt")
// }
//processText();
// function processText(){
//   print("SPLIT INTO WORDS");
//   let splitWords = textFile[0].split(" ");
//   print(splitWords);

//   print("SPLIT INTO CHARS");
//   let splitChars = textFile[1].split("");
//   print(splitChars);

//   print("SPREAD INTO CHARS");
//   let spreadChars = [...textFile[2]];
//   print(spreadChars);
// }
