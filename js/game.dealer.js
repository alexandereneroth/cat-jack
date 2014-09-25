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
		deck = game.getDeck(4);
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

	that.dealCardTo = function (hand, numberOfCards) {
		for (var x = 0; x < numberOfCards; x++) {
			hand.addCard(deck.pop());
		}
	};

	that.dealFirstHand = function () {

		// House and player gets two cards each.
		that.dealCardTo(game.player.getHand(), 2);
		that.dealCardTo(hand, 2);
	};


	// Draw cards until the hands value is 17 or above, and under 22.
	that.playRound = function () {
		var drawnCard;

		// Reveal hidden card before drawing
		alert(game.getGameStatusMessage('Dealer reveals: ' + hand.getCards()[1]));

		while (hand.getTotalValue() < 17 && hand.getTotalValue() !== 21) {
			drawnCard = deck.pop();
			hand.addCard(drawnCard);

			alert(game.getGameStatusMessage('Dealer drew: ' + drawnCard));
		}
	};


	that.declareWinner = function (playerArray) {
		// Determine the winner(s).
		var winningHandValue = 0;
		var winners = [];

		if (hand.getTotalValue() < 22) {
			// initialized with the house as the winner.
			winningHandValue = hand.getTotalValue();
			winners = [name];
		}

		for (var i = 0; i < playerArray.length; i++) {

			var playerHandValue = playerArray[i].getHand().getTotalValue();

			if (playerHandValue > winningHandValue && playerHandValue < 22) {
				winningHandValue = playerHandValue;
				winners = []; //empty the array
				winners.push(playerArray[i].getName());
			} else if (playerHandValue === winningHandValue) {
				winners.push(playerArray[i].getName());
			}
		}
		// Print out the winner(s).
		var message = '';
		if (winners.length > 1) {
			message = 'The players: \n';
			for (var x = 0; x < winners.length; x++) {
				message = message + winners[x] + '\n';
			}
			message = message + 'Tied, with a hand value of ' + winningHandValue + '!\n';
		} else {
			message = winners[0] + ' won with ' + winningHandValue + '!';
		}
		alert(game.getGameStatusMessage(message));
	};

	that.getHand = function () {
		return hand;
	};

	return that;
};