/*globals game:true */

// * * * * * * * * * * * * * * * * * * * * *
// CatJack v0.2
//
// By Alexander Eneroth and Jitan Elis
// Final refactoring by Jitan
//
// JS Project @ YHC3L School 2014
// * * * * * * * * * * * * * * * * * * * * *

'use strict';

// Onload function to load the game.
$(function () {
	// Bind key listeners
	$('#hit-button').click(function () {
		game.dealer.hit();
	});
	$('#stand-button').click(function () {
		game.dealer.stand();
	});
	game.startGame();
});

// Main object to hold the rest of the game
var game = {
	// These variables are stored in hand.js but are duplicated here
	// for short notation access 
	// (game.playerScore instead of game.dealer.getHand().getTotalValue())
	playerScore: 0,
	dealerScore: 0,
	dealerCards: [],
	playerCards: [],

	// Global settings
	numberOfDecks: 4,
	globalTimeout: 1111, // timeout in ms between board updates

	// Global states
	isPlayerRound: true,
	gameOver: false,

	// Message for messagebox
	focusMessage: '',

	startGame: function () {
		game.dealer.dealFirstHand();
	},

	// Updates all ui relevant variables
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

	// Gets copy of gamestate for replay function
	getCopy: function () {
		var copy = {
			playerScore: game.playerScore,
			dealerScore: game.dealerScore,
			playerCards: {},
			dealerCards: {},
			focusMessage: game.focusMessage,
			gameOver: game.gameOver
		};

		// Cards need to be deep copied or we just end up with references
		$.extend(true, copy.playerCards, game.playerCards);
		$.extend(true, copy.dealerCards, game.dealerCards);
		return copy;
	}
};