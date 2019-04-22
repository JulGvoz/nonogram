function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function extractHints(ngActual) {
	let hints = {};
	hints.vertical = ngActual.verticalHints;
	hints.horizontal = ngActual.horizontalHints;
	return hints;
}

function checkIfSolved(ng, hints) {
	for (let i = 0; i < ng.height; i++) {
		let ngHints = ng.getHints(i, true); // coord, horiz
		//console.log(ngHints, hints.horizontal[i]);
		if (!arraysEqual(ngHints, hints.horizontal[i])) {
			return i;
		}
	}
	
	for (let i = 0; i < ng.width; i++) {
		let ngHints = ng.getHints(i, false); // coord, horiz
		if (!arraysEqual(ngHints, hints.vertical[i])) {
			//console.log(ngHints, hints.vertical[i]);
			return ng.height+i;
		}
	}
	return -1;
}

var totalTries = 0;

function solveNonogram(ng, hints, i=0, j=0) {
    console.log(ng, i, j);
	totalTries++;
	if (totalTries >= 500) {
        return false;
	}
	let badPlace = checkIfSolved(ng, hints);
	if (badPlace == -1) {
		return ng;
	}
    if (j >= ng.width) {
        j = 0;
        i++;
        if (i >= ng.height) {
            return false;
        }
    }
    
    let emptySolve = solveNonogram(ng, hints, i, j+1);
    ng[i][j] = "filled";
    let filledSolve = solveNonogram(ng, hints, i, j+1);
    return emptySolve ? emptySolve : filledSolve;
}
