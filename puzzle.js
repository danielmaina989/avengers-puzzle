let rows = 5;
let columns = 5;

let currentTile;
let otherTile;

let turns = 0;

window.onload = function () {
  //initialize the 5x5 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img>
      let tile = document.createElement("img");
      tile.src = "./images/blank.jpg";

      //drag functionality
      tile.addEventListener("dragstart", dragStart); //click on image to drag
      tile.addEventListener("dragover", dragOver); //drag an image
      tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
      tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
      tile.addEventListener("drop", dragDrop); //drop an image onto another one
      tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

      document.getElementById("board").append(tile);
    }
  }
  //pieces
  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); //put 1 - 25 into the array
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    //swap
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./images/" + pieces[i] + ".jpg";

    //drag functionality
    tile.addEventListener("dragstart", dragStart); //click image to drag
    tile.addEventListener("dragover", dragOver); //drag on the image
    tile.addEventListener("dragenter", dragEnter); //dragging an image ito another one
    tile.addEventListener("dragleave", dragLeave); //drag an image away from another one
    tile.addEventListener("drop", dragDrop); //drop an image into another one
    tile.addEventListener("dragend", dragEnd); //after you have copmpleted dragDrop

    document.getElementById("pieces").append(tile);
  }
};
//drag tiles
function dragStart() {
  currentTile = this; //this refers to image that was clicked on for dragging.
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {}
function dragDrop() {
  otherTile = this; //this refers to image that is been dropped on.
}

function dragEnd() {
  if (currentTile.src.includes("blank")) {
    return;
  }
  let currentImg = currentTile.src;
  let otherImg = otherTile.src;
  currentTile.src = otherImg;
  otherTile.src = currentImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;
}
