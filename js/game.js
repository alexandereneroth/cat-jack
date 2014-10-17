'use strict';
/**
 **	The main object that is used to interact with the game.
 **/
var game = (function () {
	var that = {};

	//    ______________________
	//___/        PUBLIC        \___

	that.m = {}; // model
	that.c = {}; // controller

	that.start = function () {

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

	};
	return that;
}());