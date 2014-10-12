/*globals game:true */

'use strict';

var game = {
	player: {},
	dealer: {},
	isPlayerRound: true,

	startGame: function () {

		// Main game function calls
		game.dealer.setNumberOfCardDecks(4);
		game.dealer.shuffleDeck();

		game.dealer.dealFirstHand(game.player);
	},

	playerRound: function () {},

	hit: function () {
		console.log('hit');
		if (game.isPlayerRound) { // Will disable button if it's not the playersround
			game.dealer.dealCardTo(game.player, 1);
			if (game.gameState.playerScore > 21) {
				game.gameState.update('Player Bust!');
				game.ui.updateBoard(game.gameState);
				game.isPlayerRound = false;
				game.dealerRound();
			}
		}
	},

	stand: function () {
		console.log('stand');
		if (game.isPlayerRound) { // Will disable button if it's not the playersround
			game.isPlayerRound = false;
			game.dealerRound();
		}
	},

	dealerRound: function () {
		game.dealer.playRound();
	},


};