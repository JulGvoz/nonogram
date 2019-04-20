"use strict";

class Nonogram {
	/*
	 * Constructs an empty Nonogram, with arrays prefilled with false.
	 * */
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.nonogram = [];
		for (let i = 0; i < this.height; i++) {
			this.nonogram.push([]);
			for (let j = 0; j < this.width; j++) {
				this.nonogram[i].push("empty");
			}
		} 
	}
	/*
	 * Generates a random Nonogram, given a fillRatio, defaults to 0.5
	 * */
	generate(fillRatio=0.5) {
		this.totalDots = 0;
		this.fillRatio = fillRatio;
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				if (random() < this.fillRatio) {
					this.nonogram[i][j] = "filled";
					this.totalDots++;
				}
			}
		} 
		
		this.scoreK1 = this.totalDots;
		this.scoreK2 = 2*(this.width*this.height)-this.scoreK1;
	}
	
	/*
	 * Sets parameters of the Nonogram, given an object, where keys are actual parameters, and values are the parameter values.
	 * */
	setParameters(parameters) {
		/*
		let parameterList = ["squareSize",
		 "gridX", "gridY",
		 "textHorizontalX", "textHorizontalY",
		 "textVerticalX", "textVerticalY",
		 "textHorizontalOddOffset",
		 "filledColor", "emptyColor", 
		 "strokeColor", "strokeWeight",
		 "textSize", "textColor"]
		*/
		for (var p in parameters) {
			this[p] = parameters[p];
		}
	}
	
	/*
	 * Draws the grid, without the hints or anything like that.
	 * */
	drawGrid() {
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				stroke(this.strokeColor);
				strokeWeight(this.strokeWeight);
				let parameterName = this.nonogram[i][j] + "Color";
				fill(this[parameterName]);
				rect(this.gridX + j*this.squareSize, this.gridY + i*this.squareSize, this.squareSize, this.squareSize);
			}
		}
	}
	
	/*
	 * Calculates Nonogram hints, given row/column and verticality(bool), as in whether it is vertical or horizontal row or column.
	 * */
	getHints(coord, horiz) {
		let hints = [];
		let currentCount = 0;
		let size = horiz ? this.height : this.width;
		for (let i = 0; i < size; i++) {
			let checked = horiz ? this.nonogram[i][coord] : this.nonogram[coord][i];
			
			if (checked == "filled") {
				currentCount++;
			} else {
				if (currentCount != 0) {
					hints.push(currentCount);
				}
				currentCount = 0;
			}
		}
		if (currentCount != 0) {
			hints.push(currentCount);
		}
		return hints;
	}
	
	calculateHintsHorizontal() {
		this.horizontalHints = [];
		for (let i = 0; i < this.width; i++) {
			this.horizontalHints.push(this.getHints(i, true));
		}
	}
	
	calculateHintsVertical() {
		this.verticalHints = [];
		for (let i = 0; i < this.height; i++) {
			this.verticalHints.push(this.getHints(i, false));
		}
	}
	
	drawTextHorizontal() {
		for (let i = 0; i < this.width; i++) {
			textSize(this.textSize);
			/*
			fill(225,225,225);
			rect(this.textHorizontalX + i*this.squareSize, this.textHorizontalY + (i%2)*this.textHorizontalOddOffset, 50, 50);
			* */
			fill(this.textColor);
			text(this.horizontalHints[i], this.textHorizontalX + i*this.squareSize, this.textHorizontalY + (i%2)*this.textHorizontalOddOffset);
			
		}
	}
	
	drawTextVertical() {
		for (let i = 0; i < this.height; i++) {
			textSize(this.textSize);
			/*
			fill(225,225,225);
			rect(this.textVerticalX, this.textVerticalY + i*this.squareSize, 50, 50);
			* */
			fill(this.textColor);
			text(this.verticalHints[i], this.textVerticalX, this.textVerticalY + i*this.squareSize);
			
		}
	}
	
	getSelectedCell(x, y) {
		let rtrnX = floor((x - this.gridX)/this.squareSize);
		let rtrnY = floor((y - this.gridY)/this.squareSize);
		
		return {x: rtrnX, y: rtrnY};
	}
	
	checkVictory(that) {
		let winState = "won";
		if (this.width != that.width || this.height != that.height) {
			winState = "wrongTarget";
			return winState;
		}
		
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				if (this.nonogram[i][j] == "filled" && that.nonogram[i][j] != "filled") {
					winState = "unfinished";
				}
				if (this.nonogram[i][j] == "empty" && that.nonogram[i][j] == "filled") {
					winState = "mistaken";
					return winState;
				}
			}
		}
		return winState;
	}
}
