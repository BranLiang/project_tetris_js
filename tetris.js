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

	var respawn = function () {
		var newTetris = new TetrisConstructor([
			[0, 0],
			[1, 0],
			[2, 0],
			[2, 1]
		]);
		currentTetris = newTetris;
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

	return stub;
})();
