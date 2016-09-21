var APP = APP || {};

APP.ControllerModule = (function (View, Tetris) {
	"use strict"

	var stub = {};

	stub.init = function () {
		View.init();
		Tetris.createTetris([
			[0, 0]
		]);
		// keyListener();
		myInterval();
	};

	var keyListener = function () {
		$(document).keydown(function (event) {
			var key = event.keyCode;
			if (key === 37) {
				Tetris.getCurrentTetris().moveLeft();
				viewAction();
			} else if (key === 39) {
				Tetris.getCurrentTetris().moveRight();
				viewAction();
			};
		});
	};

	var viewAction = function () {
		View.clearBoard();
		View.drawOneTetris(Tetris.getCurrentTetris());
	};

	var myInterval = function () {
		setInterval(function () {
			viewAction();
			Tetris.getCurrentTetris().tic();
		}, 10000);
	};

	return stub;
})(APP.ViewModule, APP.TetrisModule);

$(document).ready(function () {
	APP.ControllerModule.init();
});
$(document).ready(function () {
	APP.ControllerModule.init();
});
