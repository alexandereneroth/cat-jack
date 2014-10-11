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
	isPlayerRound: true,

	// Updates gamestate and sends it to the ui to be displayed.
	updateGameState: function (focusMessage, resultMessage) {
		game.gameState.playerCards = game.player.getHand().getCards();
		game.gameState.dealerCards = game.dealer.getHand().getCards();
		game.gameState.playerScore = game.player.getHand().getTotalValue();
		game.gameState.dealerScore = game.dealer.getHand().getTotalValue();
		game.gameState.focusMessage = focusMessage;
		game.gameState.resultMessage = resultMessage;
		game.ui.updateBoard(game.gameState);
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
		if (game.isPlayerRound) {
			game.dealer.dealCardTo(game.player, 1);
			if (game.gameState.playerScore > 21) {
				game.updateGameState('Player Bust!');
				game.ui.updateBoard(game.gameState);
				game.isPlayerRound = false;
				game.dealerRound();
			}
		}
	},

	stand: function () {
		console.log('stand');
		if (game.isPlayerRound) {
			game.isPlayerRound = false;
			game.dealerRound();
		}
	},

	dealerRound: function () {
		game.dealer.playRound();
	},


};