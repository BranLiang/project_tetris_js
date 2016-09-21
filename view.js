var APP = APP || {};

APP.ViewModule = (function () {
	"use strict"

	var stub = {};

	stub.clearBoard = function () {
		$('.coordinate').removeClass("block").css("background-color", "");
	};

	stub.drawOneTetris = function (tetris) {
		for (var i = 0; i < tetris.blocksArray.length; i++) {
			drawOneBlock(tetris.blocksArray[i], tetris.color);
		};
	};

	stub.drawFixedtetris = function (tetrises) {
		for (var i = 0; i < tetrises.length; i++) {
			stub.drawOneTetris(tetrises[i]);
		}
	};

	stub.init = function () {
		createBlockDivs();
	};

	var drawOneBlock = function (position, color) {
		var x = position[0];
		var y = position[1];
		var $target = $(".coordinate[coordx='" + x + "'][coordy='" + y + "']");
		$target.addClass("block").css("background-color", color);
	};

	var createBlockDivs = function () {
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 20; j++) {
				var $block = $("<div></div>").attr("coordx", i)
					.attr("coordy", j)
					.addClass("coordinate")
					.css("left", i * 20)
					.css("top", j * 20);
				$(".board").append($block);
			};
		};
	};

	return stub;
})();
