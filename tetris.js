var APP = APP || {};

APP.TetrisModule = (function () {
	"use strict"

	var stub = {};

	var fixedTetris = [];
	var currentTetris = undefined;

	stub.createTetris = function () {
		respawn();
	};

	stub.getCurrentTetris = function () {
		return currentTetris;
	};

	stub.getFixedTetris = function () {
		return fixedTetris;
	};

	stub.checkIfShouldStop = function () {
		if (touchGround() || overAnother()) {
			currentTetris.stop();
			fixedTetris.push(currentTetris);
			respawn();
		};
	};

	stub.checkIfResolve = function () {
		var lines = resolvingPositions(blocksAnalysis());
		// setTimeout(function () {
		clearFixedTetris(lines);
		// }, 1500);
		aboveBlocksMoveDown(lines);
	};

	stub.gameOver = function () {
		for (var i = 0; i < fixedTetris.length; i++) {
			for (var j = 0; j < fixedTetris[i].blocksArray.length; j++) {
				if (fixedTetris[i].blocksArray[j][1] < 0) {
					return true;
				};
			};
		};
		return false;
	};

	var blocksAnalysis = function () {
		var allBlocks = {};
		for (var i = 0; i < 20; i++) {
			allBlocks[i] = 0;
		};
		for (var i = 0; i < fixedTetris.length; i++) {
			for (var j = 0; j < fixedTetris[i].blocksArray.length; j++) {
				var position = fixedTetris[i].blocksArray[j];
				allBlocks[position[1]] += 1;
			};
		};
		return allBlocks;
	};

	var resolvingPositions = function (allBlocks) {
		var result = [];
		for (var i = 0; i < 20; i++) {
			if (allBlocks[i] === 10) {
				result.push(i);
			};
		};
		return result;
	};

	var clearFixedTetris = function (lines) {
		for (var k = 0; k < lines.length; k++) {
			var line = lines[k];
			for (var i = 0; i < fixedTetris.length; i++) {
				for (var j = 0; j < fixedTetris[i].blocksArray.length; j++) {
					var position = fixedTetris[i].blocksArray[j];
					if (position[1] === line) {
						fixedTetris[i].blocksArray.splice(j, 1, [undefined, undefined]);
					};
				};
			};
		};
	};

	var aboveBlocksMoveDown = function (lines) {
		var distance = lines.length;
		for (var i = 0; i < fixedTetris.length; i++) {
			for (var j = 0; j < fixedTetris[i].blocksArray.length; j++) {
				var position = fixedTetris[i].blocksArray[j];
				if (position[1] < lines[0]) {
					fixedTetris[i].blocksArray[j][1] += distance;
				};
			};
		};
	};


	var respawn = function () {
		var randomTetrisIndex = Math.floor(Math.random() * 4 + 1);
		var rsp = Math.floor(Math.random() * 7 + 2); // random spawn position
		var h = -2; // random spawn height
		if (randomTetrisIndex === 1) {
			// bar
			var blocksArray = [
				[rsp - 2, h],
				[rsp - 1, h],
				[rsp, h],
				[rsp + 1, h]
			];
		} else if (randomTetrisIndex === 2) {
			// L
			var blocksArray = [
				[rsp - 1, h],
				[rsp, h],
				[rsp + 1, h],
				[rsp + 1, h + 1]
			];
		} else if (randomTetrisIndex === 3) {
			// cross
			var blocksArray = [
				[rsp - 1, h],
				[rsp - 1, h + 1],
				[rsp, h],
				[rsp, h + 1]
			];
		} else if (randomTetrisIndex === 4) {
			// S
			var blocksArray = [
				[rsp - 1, h],
				[rsp, h],
				[rsp, h + 1],
				[rsp + 1, h + 1]
			];
		};
		var newTetris = new TetrisConstructor(blocksArray);
		currentTetris = newTetris;
		randomRotate(currentTetris);
	};

	var randomRotate = function (tetris) {
		var num = Math.floor(Math.random() * 4 + 1);
		for (var i = 0; i < num; i++) {
			tetris.rotate();
		};
	};

	var touchGround = function () {
		for (var i = 0; i < currentTetris.blocksArray.length; i++) {
			var position = currentTetris.blocksArray[i];
			if (position[1] === 19) {
				return true;
			};
		};
		return false;
	};

	var overAnother = function () {
		for (var i = 0; i < currentTetris.blocksArray.length; i++) {
			var cPosition = currentTetris.blocksArray[i];
			for (var j = 0; j < fixedTetris.length; j++) {
				for (var k = 0; k < fixedTetris[j].blocksArray.length; k++) {
					var fPosition = fixedTetris[j].blocksArray[k];
					if (cPosition[0] === fPosition[0] && cPosition[1] === (fPosition[1] - 1)) {
						return true;
					};
				};
			};
		};
		return false;
	};

	var TetrisConstructor = function (positionArray) {
		this.blocksArray = positionArray;
		this.color = getRandomColor();
		this.speed = 1;
	};

	var getRandomColor = function () {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		};
		return color;
	};

	var allPositive = function (array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][0] <= 0) {
				return false;
			};
		};
		return true;
	};

	var allBelowBoundry = function (array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][0] >= 9) {
				return false;
			};
		};
		return true;
	};

	var hasLeftCloseTetris = function () {
		for (var i = 0; i < currentTetris.blocksArray.length; i++) {
			var cPosition = currentTetris.blocksArray[i];
			for (var j = 0; j < fixedTetris.length; j++) {
				for (var k = 0; k < fixedTetris[j].blocksArray.length; k++) {
					var fPosition = fixedTetris[j].blocksArray[k];
					if (cPosition[0] === (fPosition[0] + 1) && cPosition[1] === fPosition[1]) {
						return true;
					};
				};
			};
		};
		return false;
	};

	var hasRightCloseTetris = function () {
		for (var i = 0; i < currentTetris.blocksArray.length; i++) {
			var cPosition = currentTetris.blocksArray[i];
			for (var j = 0; j < fixedTetris.length; j++) {
				for (var k = 0; k < fixedTetris[j].blocksArray.length; k++) {
					var fPosition = fixedTetris[j].blocksArray[k];
					if (cPosition[0] === (fPosition[0] - 1) && cPosition[1] === fPosition[1]) {
						return true;
					};
				};
			};
		};
		return false;
	};

	var hasOverLap = function (array) {
		for (var i = 0; i < array.length; i++) {
			var cPosition = array[i];
			for (var j = 0; j < fixedTetris.length; j++) {
				for (var k = 0; k < fixedTetris[j].blocksArray.length; k++) {
					var fPosition = fixedTetris[j].blocksArray[k];
					if (cPosition[0] === fPosition[0] && cPosition[1] === fPosition[1]) {
						return true;
					};
				};
			};
		};
		return false;
	}

	TetrisConstructor.prototype.tic = function () {
		for (var i = 0; i < this.blocksArray.length; i++) {
			this.blocksArray[i][1] += 1 * this.speed;
		};
	};

	TetrisConstructor.prototype.moveLeft = function () {
		var positions = this.blocksArray;
		if (allPositive(positions) && !hasLeftCloseTetris()) {
			for (var i = 0; i < positions.length; i++) {
				positions[i][0] -= 1;
			};
		};
	};

	TetrisConstructor.prototype.moveRight = function () {
		var positions = this.blocksArray;
		if (allBelowBoundry(positions) && !hasRightCloseTetris()) {
			for (var i = 0; i < positions.length; i++) {
				positions[i][0] += 1;
			};
		};
	};

	TetrisConstructor.prototype.stop = function () {
		this.speed = 0;
	};

	TetrisConstructor.prototype.rotate = function () {
		var points = this.blocksArray
		var center = points[1];
		var rPoint1 = [points[0][0] - center[0], points[0][1] - center[1]];
		var rPoint3 = [points[2][0] - center[0], points[2][1] - center[1]];
		var rPoint4 = [points[3][0] - center[0], points[3][1] - center[1]];
		var newPoint1 = [rPoint1[1] + center[0], -rPoint1[0] + center[1]];
		var newPoint3 = [rPoint3[1] + center[0], -rPoint3[0] + center[1]];
		var newPoint4 = [rPoint4[1] + center[0], -rPoint4[0] + center[1]];

		var array = [newPoint1, center, newPoint3, newPoint4];

		if (allBelowBoundry(array) && allPositive(array) && !hasOverLap(array)) {
			this.blocksArray = array;
		};
	};

	return stub;
})();
