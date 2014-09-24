'use strict';
game.createDealer = function (dealerName) {
	var that = {};
	var name = dealerName;
	var hand = game.createHand();
	var deck = [];

	that.getName = function () {
		return name;
	};

	that.getDeck = function (numberOfDecks) {
		var newDeck = [];
		for (var x = 0; x < numberOfDecks; x++) {
			newDeck.push('AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
				'JC', 'QC', 'KC');
			newDeck.push('AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
				'JH', 'QH', 'KH');
			newDeck.push('AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD',
				'JD', 'QD', 'KD');
			newDeck.push('AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
				'JS', 'QS', 'KS');
		}
		return newDeck;
	};

	that.shuffleDeck = function (array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	that.prepareDeck = function () {

		// Take four decks and shuffle them
		deck = that.getDeck(4);
		that.shuffleDeck(deck);
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


	// Draw cards until the outcome of BlackJack can be determined.
	that.playRound = function () {
		var drawnCard;

		// Reveal hidden card before drawing
		alert(game.getGameStatusMessage('Dealer reveals: ' + hand.getCards()[1]));

		if (hand.getTotalValue() === 21) {
			return;
		}
		// Draw cards until the player hand value had been matched or exceeded.
		while (hand.getTotalValue() < 17) {
			if (hand.getTotalValue() > 20) {
				return;
			}
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