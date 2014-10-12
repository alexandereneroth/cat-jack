'use strict';
game.createDealer = function (dealerName) {
	var that = {};
	//    ______________________
	//___/        PRIVATE       \___
	var name = dealerName;
	var hand = game.createHand();
	var deck;

	//    ______________________
	//___/        PUBLIC        \___
	that.getName = function () {
		return name;
	};

	that.setNumberOfCardDecks = function (numberOfDecks) {
		deck = game.getDeck(numberOfDecks);
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

	that.dealCardTo = function (player) {
		var drawnCard = deck.pop();
		player.getHand().addCard(drawnCard);
		game.gameState.update(player.getName() + ' has received ' + drawnCard);
		game.ui.updateBoard(game.gameState);
	};

	that.dealFirstHand = function () {

		// House and player gets two cards each.
		that.dealCardTo(game.player);
		that.dealCardTo(game.player);
		that.dealCardTo(this);
		that.dealCardTo(this);

		// Hide the second dealer card until dealer.playRound() is called
		hand.flip(1);
		game.gameState.update('Welcome to a new game!');
		game.ui.updateBoard(game.gameState);

	};

	that.updateAlert = function () {
		if (hand.getTotalValue() > 21) {
			game.dealerAlert = ' - Bust!';
		} else if (hand.getTotalValue() === 21) {
			game.dealerAlert = ' - CatJack!';
		} else if (hand.getTotalValue() > 16) {
			game.dealerAlert = ' - Stand';
		}
	};

	// Draw cards until the hands value is 17 or above, and under 22.
	that.playRound = function () {
		var gameStateHistory = [];

		var getDealerCard = function () {
			var drawnCard = deck.pop();
			hand.addCard(drawnCard);
			game.gameState.update('Dealer draws ' + drawnCard, false);

		};

		// Reveal hidden card
		hand.flip(1);
		game.gameState.update('Dealer reveals ' + hand.getCard(1), false);
		game.ui.updateBoard(game.gameState);

		gameStateHistory.push(game.gameState.getCopy());

		// Finish the whole round and store drawn cards for replay with delay
		while (hand.getTotalValue() < 17 && hand.getTotalValue() !== 21) {
			getDealerCard();
			gameStateHistory.push(game.gameState.getCopy());
		}
		gameStateHistory[gameStateHistory.length - 1].gameOver = true;

		// Replay the gameround with delay
		for (var i = 0; i < gameStateHistory.length; i++) {

			(function (n) {
				var gameStateI = gameStateHistory[i];

				setTimeout(function () {
					console.dir(gameStateI);
					game.ui.updateBoard(gameStateI);

				}, 1000 * n);

			}(i));
		}
	};

	that.getHand = function () {
		return hand;
	};

	return that;
};