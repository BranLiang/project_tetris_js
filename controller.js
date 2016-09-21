var APP = APP || {};

APP.ControllerModule = (function (View, Tetris) {
	"use strict"

	var stub = {};

	var intervalTime = 500;

	stub.init = function () {
		View.init();
		Tetris.createTetris();
		keyMoveListener();
		keyAccelerateListener();
		myInterval();
	};

	var keyMoveListener = function () {
		$(document).keydown(function (event) {
			var key = event.keyCode;
			if (key === 37) {
				Tetris.getCurrentTetris().moveLeft();
				refreashScreen();
			} else if (key === 39) {
				Tetris.getCurrentTetris().moveRight();
				refreashScreen();
			} else if (key === 38) {
				Tetris.getCurrentTetris().rotate();
				refreashScreen();
			};
		});
	};

	var keyAccelerateListener = function () {
		$(document).keydown(function (event) {
			var key = event.keyCode;
			if (key === 40) {
				intervalTime = 50;
			};
		});

		$(document).keyup(function (event) {
			var key = event.keyCode;
			if (key === 40) {
				intervalTime = 500;
			}
		});
	};

	var refreashScreen = function () {
		View.clearBoard();
		View.drawOneTetris(Tetris.getCurrentTetris());
		View.drawFixedtetris(Tetris.getFixedTetris());
	};

	var myInterval = function () {
		if (gameOver()) {
			View.showGameOver();
		} else {
			setTimeout(function () {
				refreashScreen();
				Tetris.getCurrentTetris().tic();
				Tetris.checkIfShouldStop();
				Tetris.checkIfResolve();
				myInterval();
			}, intervalTime);
		};
	};

	var gameOver = function () {
		return Tetris.gameOver();
	};

	return stub;
})(APP.ViewModule, APP.TetrisModule);

$(document).ready(function () {
	APP.ControllerModule.init();
});
