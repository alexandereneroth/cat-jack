'use strict';
game.createDealer = function (dealerName) {
	var that = {};
	//    ______________________
	//___/        PRIVATE       \___
	var name = dealerName;
	var hand = game.createHand();
	var deck = game.getDeck(1);

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

	that.dealCardTo = function (player, numberOfCards) {
		for (var x = 0; x < numberOfCards; x++) {
			var drawnCard = deck.pop();
			player.getHand().addCard(drawnCard);
		}
		game.updateGameState('');
		game.ui.updateBoard(game.gameState);
	};

	that.dealFirstHand = function () {

		// House and player gets two cards each.
		that.dealCardTo(game.player, 2);
		that.dealCardTo(this, 2);

		// Hide the second dealer card until dealer.playRound() is called
		hand.flip(1);
		game.updateGameState('Welcome to a new game!');
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
		var drawnCard;

		// Reveal hidden card before drawing
		hand.flip(1);

		while (hand.getTotalValue() < 17 && hand.getTotalValue() !== 21) {
			drawnCard = deck.pop();
			hand.addCard(drawnCard);
		}
	};


	that.declareWinner = function (playerArray) {
		// Determine the winner(s).
		var winningHandValue = 0;
		var winnerNames = [];
		var dealerHasStood = false;
		var dealerHasBusted = false;

		// if the dealer has a possibility of winning
		if (hand.getTotalValue() < 22) {
			// initialize with the dealer as the winner.
			winningHandValue = hand.getTotalValue();
			winnerNames = [name];
			if (game.dealerAlert === ' - Stand') {
				dealerHasStood = true;
			} else if (game.dealerAlert === ' - Bust!') {
				dealerHasBusted = true;
			}
			game.dealerAlert = ' - Winner!';
		}

		for (var i = 0; i < playerArray.length; i++) {

			var playerHandValue = playerArray[i].getHand().getTotalValue();
			// If this player has the best hand value so far in the loop
			if (playerHandValue > winningHandValue && playerHandValue < 22) {
				// set it as the winner
				winningHandValue = playerHandValue;
				winnerNames = []; //empties the array
				winnerNames.push(playerArray[i].getName());
				game.playerAlert = ' - Winner!';

				// Reset dealerAlert if player has the winning hand.
				if (dealerHasBusted) {
					game.dealerAlert = ' - Bust!';
				} else if (dealerHasStood) {
					game.dealerAlert = ' - Stand';
				}

				// Or if this player has the same as the best hand value so far
			} else if (playerHandValue === winningHandValue) {
				//add it to the list of winnerNames
				winnerNames.push(playerArray[i].getName());
				game.dealerAlert = ' - Tied!';
				game.playerAlert = ' - Tied!';
			}
		}
		// Print out the winner(s).
		var message = '';
		if (winnerNames.length > 1) {
			for (var x = 0; x < winnerNames.length; x++) {
				message = message + winnerNames[x] + ', tied!\n';
			}
		} else if (winnerNames.length === 1) {
			message = winnerNames[0] + ' wins!';
		} else {
			message = 'Everyone busted!';
		}
	};

	that.getHand = function () {
		return hand;
	};

	return that;
};