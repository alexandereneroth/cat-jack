/*globals game:true */

'use strict';
var game = {
	player: {},
	dealer: {},
	playerAlert: '',
	dealerAlert: '',
	gameState: { // Object to store ui relevant variables for easy access
		playerScore: 0,
		dealerScore: 0,
		dealerCards: [],
		playerCards: [],
		dealerAlert: '',
		playerAlert: '',
		focusMessage: ''
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
		game.dealer.dealCardTo(game.player.getHand(), 1);
		if (game.player.getHand().getTotalValue() > 21) {

		}
		console.log('hit');
	},

	stand: function () {
		console.log('stand');
	},

	dealerRound: function () {
		game.isPlayerRound = false;
		game.dealer.playRound();
	},


};