"use strict";

window.oncontextmenu = function () { // Disable right-click
   return false;
}

function mousePressed() {
  if (mouseButton == LEFT) {
  } else 
  if (mouseButton == RIGHT) {
  }
}

var difficultySettings;
var standardParameters;
var actualNonogram;
var displayedNonogram;
/*
 * let parameterList = ["squareSize",
		 "gridX", "gridY",
		 "textHorizontalX", "textHorizontalY",
		 "textVerticalX", "textVerticalY",
		 "textHorizontalOddOffset",
		 "filledColor", "emptyColor", 
		 "strokeColor", "strokeWeight",
		 "textSize", "textColor"]
     * */

function newNonogram() {
  actualNonogram = new Nonogram(difficultySettings.width, difficultySettings.height);
  displayedNonogram = new Nonogram(difficultySettings.width, difficultySettings.height);
  actualNonogram.generate(difficultySettings.fillRatio);
  displayedNonogram.setParameters(standardParameters);
  actualNonogram.setParameters(standardParameters);
}

function setup() {
  createCanvas(1000, 500);
  
  const BLACK = color(0,0,0);
  const WHITE = color(255,255,255);
  
  standardParameters = {
    squareSize: 50,
    gridX: 100, gridY: 100,
    textHorizontalX: 100, textHorizontalY: 0,
    textVerticalX: 0, textVerticalY: 100,
    textHorizontalOddOffset: 25,
    filledColor: BLACK, emptyColor: WHITE,
    strokeColor: BLACK, strokeWeight: 1,
    textSize: 12, textColor: BLACK
  };
  difficultySettings = {
    width: 5,
    height: 5,
    fillRatio: 0.7
  };
  newNonogram();
}

function draw() {
  actualNonogram.drawGrid();
}
