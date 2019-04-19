"use strict";

var nonogram = [];
var selectedNonogram = [];
var tilesX = 9;
var tilesY = 9;
var squareSize = 50;
var showAnswers = false;
var waitForUpdate = false;

window.oncontextmenu = function () {
   return false;
}

function xyti(x, y) {
  return x + y*tilesX;
}

function nonogramThreshold(i) {
  return 0.5;
}

function getHorizontalNonogramCounts(row) {
  var horizontalNonogramCounts = [];
  var currentCount = 0;
  for (var i = 0; i < tilesX; i++) {
    if (nonogram[xyti(i, row)]) {
      currentCount++;
    } else {
      horizontalNonogramCounts.push(currentCount);
      currentCount = 0;
    }
  }
  horizontalNonogramCounts.push(currentCount);
  horizontalNonogramCounts = horizontalNonogramCounts.filter((num) => {return num != 0});
  return horizontalNonogramCounts;
}

function getVerticalNonogramCounts(column) {
  var verticalNonogramCounts = [];
  var currentCount = 0;
  for (var i = 0; i < tilesY; i++) {
    if (nonogram[xyti(column, i)]) {
      currentCount++;
    } else {
      verticalNonogramCounts.push(currentCount);
      currentCount = 0;
    }
  }
  verticalNonogramCounts.push(currentCount);
  verticalNonogramCounts = verticalNonogramCounts.filter((num) => {return num != 0});
  return verticalNonogramCounts;
}

function mousePressed() {
  var tileX = floor((mouseX-2*squareSize)/squareSize);
  var tileY = floor((mouseY-2*squareSize)/squareSize);
  if (mouseButton == LEFT) {
    selectedNonogram[xyti(tileX, tileY)] = !selectedNonogram[xyti(tileX, tileY)];
  } else if (mouseButton == RIGHT) {
    selectedNonogram[xyti(tileX, tileY)] = (selectedNonogram[xyti(tileX, tileY)] + 0.25) % 1;
  }
  waitForUpdate = false;
}

function setup() {
  createCanvas(squareSize*(tilesX+2), squareSize*(tilesY+2));
  
  for (var i = 0; i < tilesX*tilesY; i++) {
    nonogram[i] = random() >= nonogramThreshold(i);
    selectedNonogram[i] = false;
  }
  /*
  console.log("Horizontal: ");
  for (var i = 0; i < tilesY; i++) {
    console.log(getHorizontalNonogramCounts(i));
  }
  
  console.log("Vertical: ");
  for (var i = 0; i < tilesX; i++) {
    console.log(getVerticalNonogramCounts(i));
  }
  */
}

function setDebugMode(bool) {
  showAnswers = bool;
}

function draw() {
  if (!waitForUpdate) {
    background(255,255,255)
    strokeWeight(1);
    stroke(0,0,0);
    textSize(16);
    for (var i = 0; i < tilesX; i++) {
      text(getVerticalNonogramCounts(i), (i+2)*squareSize, (i%2)*(squareSize/2), squareSize, squareSize);
    }
    for (var i = 0; i < tilesY; i++) {
      text(getHorizontalNonogramCounts(i), 0, (i+2)*squareSize, squareSize, squareSize);
    }
    push();
    translate(squareSize*2, squareSize*2);
    
    for (var i = 0; i < tilesY; i++) {
      for (var j = 0; j < tilesX; j++) {
        fill((1-selectedNonogram[xyti(j,i)])*255);
        stroke(0,0,0);
        rect(j*squareSize, i*squareSize, squareSize, squareSize);
        if (showAnswers) {
          fill((1-nonogram[xyti(j,i)])*255);
          noStroke();
          ellipse((j+0.5)*squareSize,(i+0.5)*squareSize,squareSize/4,squareSize/4)
        }
      }
    }
    
    pop();
    
    
    var allCorrect = true;
    for (var i = 0; i < tilesX*tilesY; i++) {
      allCorrect = allCorrect && floor(selectedNonogram[i]) == nonogram[i];
    }
    if (allCorrect) {
      console.log("YOU WIN!");
      noLoop();
    }
    
    waitForUpdate = true;
  }
}
