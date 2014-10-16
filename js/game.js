'use strict';
var game = {

	m: {}, // model
	c: {}, // controller

	start: function () {

		// Bind key listeners
		$('#hit-button').click(function () {
			game.m.hit();
		});
		$('#stand-button').click(function () {
			game.m.stand();
		});

		// game.m.player = game.m.createPlayer(prompt('Please enter your name:'));
		game.m.player = game.m.createPlayer('Player');
		game.m.dealer = game.m.createDealer('Joe the Dealer');
		game.m.startGame();

	}
};