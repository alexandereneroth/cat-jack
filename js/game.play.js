'use strict';

game.play = function () {
	game.player = game.createPlayer('Tom');
	game.dealer = game.createDealer('Joe the Dealer');

	game.startGame();
	game.playerRound();
	game.dealerRound();
};