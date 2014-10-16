/*globals game:true */

'use strict';

var game = {
	// These variables are stored in hand.js but are duplicated here
	// for short notation access 
	// (game.playerScore instead of game.dealer.getHand().getTotalValue())
	playerScore: 0,
	dealerScore: 0,
	dealerCards: [],
	playerCards: [],

	// Global Settings
	numberOfDecks: 4,
	globalTimeout: 1111, // timeout in ms between board updates

	isPlayerRound: true,
	gameOver: false,
	focusMessage: '',

	startGame: function () {
		// Main game function calls
		game.dealer.dealFirstHand();
	},

	updateGameState: function (focusMessage, gameOver) {
		// Storing variables for shorter reference below
		var playerHand = game.dealer.getPlayerHand();
		var dealerHand = game.dealer.getDealerHand();

		game.playerCards = playerHand.getCards();
		game.dealerCards = dealerHand.getCards();
		game.playerScore = playerHand.getTotalValue();
		game.dealerScore = dealerHand.getTotalValue();
		game.focusMessage = focusMessage;
		game.gameOver = gameOver;
	},

	getCopy: function () {
		var copy = {
			playerScore: game.playerScore,
			dealerScore: game.dealerScore,
			playerCards: {},
			dealerCards: {},
			focusMessage: game.focusMessage,
			gameOver: game.gameOver
		};
		$.extend(true, copy.playerCards, game.playerCards);
		$.extend(true, copy.dealerCards, game.dealerCards);
		return copy;
	}
};