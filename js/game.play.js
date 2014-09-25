'use strict';

game.play = function () {
	// game.player = game.createPlayer(prompt('Please enter your name:'));
	game.player = game.createPlayer('Player');
	game.dealer = game.createDealer('Joe the Dealer');
	game.startGame();
};

game.play();