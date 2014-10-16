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

	//    ______________________
	//___/        PUBLIC        \___

	// Button functions
	that.hit = function () {
		console.log('hit');
		if (game.isPlayerRound) { // Will disable button if it's not the playersround
			dealCardTo(playerHand);
			game.updateGameState('Player received ' + playerHand.getLastCard());
			game.ui.updateBoard();
			if (game.playerScore > 21) {
				game.updateGameState('Player Bust!');
				game.ui.updateBoard();
				game.isPlayerRound = false;
				setTimeout(game.dealer.playRound(), game.globalTimeout);
			}
		}
	};

	that.stand = function () {
		console.log('stand');
		if (game.isPlayerRound) { // Will disable button if it's not the playersround
			game.isPlayerRound = false;
			game.dealer.playRound(); // Playe dealer round
		}
	};

	that.getPlayerHand = function () {
		return playerHand;
	};

	that.getDealerHand = function () {
		return dealerHand;
	};



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

	// Draw cards until the hands value is 17 or above, and under 22.
	that.playRound = function () {
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

		// Finish the whole round and store drawn cards for replay with delay
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
					console.dir(gameStateI);
					game.ui.updateBoard(gameStateI);

				}, game.globalTimeout * n);
			}(i));
		}
	};

	//returns 0 for tie, negative for loss, and positive for win
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

	that.shuffleDeck = function () {
		var cards = deck.cards;

		var currentIndex = cards.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = cards[currentIndex];
			cards[currentIndex] = cards[randomIndex];
			cards[randomIndex] = temporaryValue;
		}
		return cards;
	};

	return that;
})();