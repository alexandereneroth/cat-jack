/*globals game:true */

'use strict';

var game = {
	player: {},
	dealer: {},
	gameState: { // Object to store ui relevant variables for easy access
		playerScore: 0,
		dealerScore: 0,
		dealerCards: [],
		playerCards: [],
		focusMessage: ''
	},

	updateGameState: function (focusMessage, resultMessage) {
		game.gameState.playerCards = game.player.getHand().getCards();
		game.gameState.dealerCards = game.dealer.getHand().getCards();
		game.gameState.playerScore = game.player.getHand().getTotalValue();
		game.gameState.dealerScore = game.dealer.getHand().getTotalValue();
		game.gameState.focusMessage = focusMessage;
		game.gameState.resultMessage = resultMessage;
	},

	startGame: function () {

		// Main game function calls
		game.dealer.setNumberOfCardDecks(4);
		game.dealer.shuffleDeck();

		game.dealer.dealFirstHand(game.player);
		// declareWinner takes a whole array so we can implement more
		// players in the future
		// game.dealer.declareWinner([game.player]);
	},

	playerRound: function () {},

	hit: function () {
		console.log('hit');

		game.dealer.dealCardTo(game.player, 1);
		if (game.playerScore > 21) {

		}
	},

	stand: function () {
		console.log('stand');
	},

	dealerRound: function () {
		game.isPlayerRound = false;
		game.dealer.playRound();
	},


};