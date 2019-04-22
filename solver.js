

function extractHints(ngActual) {
	let hints = {};
	hints.vertical = ngActual.verticalHints;
	hints.horizontal = ng.horizontalHints;
	return hints;
}

function checkIfSolved(ng, hints) {
	for (let i = 0; i < ng.height; i++) {
		let ngHints = ng.getHints(i, true); // coord, horiz
		if (ngHints != hints.horizontal[i]) {
			return false;
		}
	}
	
	for (let i = 0; i < ng.width; i++) {
		let ngHints = ng.getHints(i, false); // coord, horiz
		if (ngHints != hints.vertical[i]) {
			return false;
		}
	}
	return true;
}

function solveNonogram(ng, hints, badSolutions=[]) {
}
