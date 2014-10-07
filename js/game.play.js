'use strict';

$(function () {
	// Bind key listeners
	$('#hit-button').click(function () {
		game.hit();
	});
	$('#stand-button').click(function () {
		game.stand();
	});

	// game.player = game.createPlayer(prompt('Please enter your name:'));
	game.player = game.createPlayer('Player');
	game.dealer = game.createDealer('Joe the Dealer');
	game.startGame();



});