/*globals game:true */

'use strict';

var game = {
	player: {},
	dealer: {},
	isPlayerRound: true,
	globalTimeout: 1800,

	// Updates gamestate which is sent to the ui for easy game board update.
	updateGameState: function (focusMessage, resultMessage) {

		// Storing variables for shorter reference below
		var gameState = game.gameState;
		var playerHand = game.player.getHand();
		var dealerHand = game.dealer.getHand();

		gameState.playerCards = playerHand.getCards();
		gameState.dealerCards = dealerHand.getCards();
		gameState.playerScore = playerHand.getTotalValue();
		gameState.dealerScore = dealerHand.getTotalValue();
		gameState.focusMessage = focusMessage;
		gameState.resultMessage = resultMessage;
	},

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