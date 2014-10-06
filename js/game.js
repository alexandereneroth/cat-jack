/*globals game:true */

'use strict';
var game = {
	player: {},
	dealer: {},
	gameOver: false,
	isPlayerRound: true,
	playerAlert: '',
	dealerAlert: '',

	startGame: function () {
		// Reset game round variables
		game.isPlayerRound = true;

		// Main game function calls
		game.dealer.setNumberOfCardDecks(4);
		game.dealer.shuffleDeck();

		game.dealer.dealFirstHand(game.player);
		// declareWinner takes a whole array so we can implement more
		// players in the future
		// game.dealer.declareWinner([game.player]);
	},

	playerRound: function () {
		// Deal first hand 
		game.dealer.dealFirstHand(game.player);
	},

	hit: function () {
		game.dealer.dealFirstHand(game.player);
		game.playerRound();
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