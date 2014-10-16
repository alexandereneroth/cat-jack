'use strict';

$(function () {
	// Bind key listeners
	$('#hit-button').click(function () {
		game.dealer.hit();
	});
	$('#stand-button').click(function () {
		game.dealer.stand();
	});
	game.startGame();
});