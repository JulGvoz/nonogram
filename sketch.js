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

var beginnerSettings;

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

var standardParameters;

function setup() {
  standardParameters = {
    squareSize: 50,
    gridX: 100, gridY: 100,
    textHorizontalX: 100, textHorizontalY: 0,
    textVerticalX: 0, textVerticalY: 100,
    textHorizontalOddOffset: 25,
    filledColor: color(0,0,0), emptyColor: color(255,255,255),
    strokeColor: color(0,0,0), strokeWeight: 1,
    textSize: 12, textColor: color(0,0,0)
  };
  beginnerSettings = {
    width: 5,
    height: 5,
    fillRatio: 0.7
  };
  createCanvas(1000, 500);
}

function draw() {
  
}
