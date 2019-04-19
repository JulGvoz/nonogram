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
				this.nonogram[i].push(false);
			}
		} 
	}
	/*
	 * Generates a random Nonogram, given a fillRatio, defaults to 0.5
	 * */
	generate(fillRatio=0.5) {
		this.fillRatio = fillRatio;
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				this.nonogram[i][j] = random() < this.fillRatio;
			}
		} 
	}
	
	/*
	 * Sets parameters of the Nonogram, given an object, where keys are actual parameters, and values are the parameter values.
	 * */
	setParameters(parameters) {
		let parameterList = ["squareSize",
		 "gridX", "gridY",
		 "textHorizontalX", "textHorizontalY",
		 "textVerticalX", "textVerticalY",
		 "textHorizontalOddOffset",
		 "filledColor", "emptyColor", 
		 "strokeColor", "strokeWeight",
		 "textSize", "textColor"]
		
		for (let p in parameterList) {
			if (parameters.hasOwnProperty(p)) {
				this[p] = parameters[p];
			}
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
				if (this.nonogram[i][j]) {
					fill(this.filledColor);
				} else {
					fill(this.emptyColor);
				}
				rect(this.gridX + j*squareSize, this.gridY + i*squareSize, squareSize, squareSize);
			}
		}
	}
	
	/*
	 * Calculates Nonogram hints, given row/column and verticality(bool), as in whether it is vertical or horizontal row or column.
	 * */
	calculateHints(coord, vert) {
		let hints = [];
		let currentCount = 0;
		let size = vert ? this.height : this.width;
		for (let i = 0; i < size; i++) {
			let checked = vert ? this.nonogram[i][coord] : this.nonogram[coord][i];
			
			if (checked) {
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
	
	calculateHintsHorizontal(row) {
		return calculateHints(row, false);
	}
	
	calculateHintsVertical(column) {
		return calculateHints(column, true);
	}
}
