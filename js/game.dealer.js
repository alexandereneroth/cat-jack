'use strict';

// Main logic object
game.dealer = (function () {
	var that = {};

	//    ______________________
	//___/        PRIVATE       \___
	var deck = game.getDeck(game.numberOfDecks);
	var dealerHand = game.createHand();
	var playerHand = game.createHand();

	var dealCardTo = function (hand) {
		var drawnCard = deck.pop();
		hand.addCard(drawnCard);
	};

	// Draw cards until the hands value is 17 or above, and under 22.
	var playDealerRound = function () {
		var gameStateHistory = [];

		var getDealerCard = function () {
			var drawnCard = deck.pop();
			dealerHand.addCard(drawnCard);
			game.updateGameState('Dealer draws ' + drawnCard);
		};

		// Reveal hidden card
		dealerHand.flip(1);
		game.updateGameState('Dealer reveals ' + dealerHand.getCard(1));
		gameStateHistory.push(game.getCopy());

		// Finish the whole round and store gamestates for replay with delay
		while (dealerHand.getTotalValue() < 17 && dealerHand.getTotalValue() !== 21) {
			getDealerCard();
			gameStateHistory.push(game.getCopy());
		}
		// Set gameover = true for the last gamestate
		gameStateHistory[gameStateHistory.length - 1].gameOver = true;

		// Replay the gameround with delay
		for (var i = 0; i < gameStateHistory.length; i++) {
			(function (n) {
				var gameStateI = gameStateHistory[i];
				setTimeout(function () {
					game.ui.updateBoard(gameStateI);
				}, game.globalTimeout * n);
			}(i));
		}
	};

	//    ______________________
	//___/        PUBLIC        \___

	// Button functions
	that.hit = function () {
		if (game.isPlayerRound) { // Will disable button if it's not the playersround
			dealCardTo(playerHand);
			game.updateGameState('Player received ' + playerHand.getLastCard());
			game.ui.updateBoard();
			if (game.playerScore > 21) {
				game.updateGameState('Player Bust!');
				game.ui.updateBoard();
				game.isPlayerRound = false;

				// We use setTimeout 
				setTimeout(playDealerRound, game.globalTimeout);
			}
		}
	};

	that.stand = function () {
		if (game.isPlayerRound) { // Will disable button if it's not the playersround
			game.isPlayerRound = false;
			playDealerRound(); // Playe dealer round
		}
	};

	// Getters
	that.getPlayerHand = function () {
		return playerHand;
	};

	that.getDealerHand = function () {
		return dealerHand;
	};

	// Setting up the board for a new game
	that.dealFirstHand = function () {
		// House and player gets two cards each.
		dealCardTo(playerHand);
		dealCardTo(playerHand);
		dealCardTo(dealerHand);
		dealCardTo(dealerHand);

		// Hide the second dealer card until dealer.playRound() is called
		dealerHand.flip(1);
		game.updateGameState('Welcome to a new game!');
		game.ui.updateBoard();
	};

	//returns 0 for tie, negative for player loss, and positive for player win
	that.getWinner = function () {

		// Storing variables for shorter reference below
		var playerScore = game.playerScore;
		var dealerScore = game.dealerScore;

		if (playerScore > 21 && dealerScore > 21) {
			return 0;
		}
		if (playerScore > 21) {
			return -1;
		}
		if (dealerScore > 21) {
			return 1;
		}
		return playerScore - dealerScore;
	};
	return that;
})();