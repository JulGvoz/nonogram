"use strict";

window.oncontextmenu = function () { // Disable right-click
   return false;
}

var difficultySettings;
var standardParameters;
var actualNonogram;
var displayedNonogram;

function mousePressed() {
    let coords = displayedNonogram.getSelectedCell(mouseX, mouseY);
    if (mouseButton == LEFT) {
		displayedNonogram.nonogram[coords.y][coords.x] = displayedNonogram.nonogram[coords.y][coords.x] == "filled" ? "empty" : "filled";
    } else 
    if (mouseButton == RIGHT) {
		displayedNonogram.nonogram[coords.y][coords.x] = displayedNonogram.nonogram[coords.y][coords.x] == "marked" ? "empty" : "marked";
    }
    //console.log(displayedNonogram);
    loop();
}

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
    
	actualNonogram.calculateHintsVertical();
	actualNonogram.calculateHintsHorizontal();
}

var BLACK;
var WHITE;
var GRAY;

function setup() {
    createCanvas(1000, 500);
    
    BLACK = color(0,0,0);
	WHITE = color(255,255,255);
	GRAY = color(128,128,128);
	textAlign(LEFT, TOP);
    
    standardParameters = {
        squareSize: 50,
        gridX: 100, gridY: 100,
        textHorizontalX: 100, textHorizontalY: 0,
        textVerticalX: 0, textVerticalY: 100,
        textHorizontalOddOffset: 25,
        filledColor: BLACK, emptyColor: WHITE, markedColor: GRAY,
        strokeColor: BLACK, strokeWeight: 1,
        textSize: 12, textColor: BLACK
    };
    difficultySettings = {
        width: 5,
        height: 5,
        fillRatio: 0.7
    };
    newNonogram();
    console.log(actualNonogram);
}

function draw() {
	background(WHITE);
    displayedNonogram.drawGrid();
    actualNonogram.drawTextHorizontal();
    actualNonogram.drawTextVertical();
    /*
    for (let i = 0; i < actualNonogram.height; i++) {
		for (let j = 0; j < actualNonogram.width; j++) {
			fill(actualNonogram[actualNonogram.nonogram[i][j]+"Color"]);
			rect(actualNonogram.gridX+j*actualNonogram.squareSize, actualNonogram.gridY + i*actualNonogram.squareSize,25,25);
		}
	}
    */
    noLoop();
}
