var APP = APP || {};

APP.TetrisModule = (function () {
	"use strict"

	var stub = {};

	var fixedTetris = [];
	var currentTetris = undefined;

	stub.createTetris = function (positionArray) {
		var newTetris = new TetrisConstructor(positionArray);
		currentTetris = newTetris;
	};

	stub.getCurrentTetris = function () {
		return currentTetris;
	};

	stub.getFixedtetris = function () {
		return fixedTetris;
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

	TetrisConstructor.prototype.tic = function () {
		for (var i = 0; i < this.blocksArray.length; i++) {
			this.blocksArray[i][1] += 1 * this.speed;
		};
	};

	TetrisConstructor.prototype.moveLeft = function () {
		var positions = this.blocksArray;
		if (allPositive(positions)) {
			for (var i = 0; i < positions.length; i++) {
				positions[i][0] -= 1;
			};
		};
	};

	TetrisConstructor.prototype.moveRight = function () {
		var positions = this.blocksArray;
		if (allBelowBoundry(positions)) {
			for (var i = 0; i < positions.length; i++) {
				positions[i][0] += 1;
			};
		};
	};

	return stub;
})();
