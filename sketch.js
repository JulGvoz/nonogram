//"use strict";

window.oncontextmenu = function () { // Disable right-click
   return false;
}

var difficultySettings;
var standardParameters;
var actualNonogram;
var displayedNonogram;
var BLACK;
var WHITE;
var GRAY;
var moves;
var score;
var lives = 1;
var livesX = 0;
var livesY;
var livesSize = 50;
var livesIcon = "\u2764";

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
	difficultySettings.fillRatio-=0.1;
	if (difficultySettings.fillRatio<0.5) {
		lives++;
		difficultySettings.fillRatio = 0.7;
		if (random() >= 0.5) {
			difficultySettings.width++
		} else {
			difficultySettings.height++;
		}
	}
	
    actualNonogram = new Nonogram(difficultySettings.width, difficultySettings.height);
    displayedNonogram = new Nonogram(difficultySettings.width, difficultySettings.height);
    actualNonogram.generate(difficultySettings.fillRatio);
    displayedNonogram.setParameters(standardParameters);
    actualNonogram.setParameters(standardParameters);
    
	actualNonogram.calculateHintsVertical();
	actualNonogram.calculateHintsHorizontal();
	
	livesY = standardParameters.gridY+difficultySettings.height*standardParameters.squareSize;
}

function mousePressed() {
	moves++;
    let coords = displayedNonogram.getSelectedCell(mouseX, mouseY);
    if (mouseButton == LEFT) {
		displayedNonogram.nonogram[coords.y][coords.x] = displayedNonogram.nonogram[coords.y][coords.x] == "filled" ? "empty" : "filled";
    } else 
    if (mouseButton == RIGHT) {
		displayedNonogram.nonogram[coords.y][coords.x] = displayedNonogram.nonogram[coords.y][coords.x] == "marked" ? "empty" : "marked";
    }
    
    if (actualNonogram.checkVictory(displayedNonogram) == "won") {
		let maxScore = (actualNonogram.width+actualNonogram.height)/actualNonogram.fillRatio;
		let localScore = maxScore*(actualNonogram.scoreK2+1-moves)/(actualNonogram.scoreK2+1-actualNonogram.scoreK1);
		if (localScore >= maxScore) {
			score+=maxScore;
		} else if (localScore >= 0) {
			score+=localScore;
		}
		console.log(score, localScore, moves, actualNonogram.scoreK1, actualNonogram.scoreK2);
		moves = 0;
		newNonogram();
	} else if (actualNonogram.checkVictory(displayedNonogram) == "mistaken") {
		lives--;
		if (lives == 0) {
			mousePressed = function() {};
		}
		mousePressed();
	}
    //console.log(displayedNonogram);
    loop();
}

function setup() {
    createCanvas(1000, 1000);
    
    BLACK = color(0,0,0);
	WHITE = color(255,255,255);
	GRAY = color(128,128,128);
	moves = 0;
	score = 0;
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
        fillRatio: 0.75
    };
    newNonogram();
    console.log(actualNonogram);
}

function draw() {
	background(WHITE);
    displayedNonogram.drawGrid();
    actualNonogram.drawTextHorizontal();
    actualNonogram.drawTextVertical();
    fill(BLACK);
    textSize(livesSize);
    let livesText = "";
    for (let i = 0; i < lives; i++) {
		livesText+=livesIcon;
	}
	if (livesText == "") {
		livesText = "Game over";
	}
    text(livesText, livesX, livesY);
    text("Score: " + round(score), livesX, livesY+livesSize);
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
