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
		alert(game.getGameStatusMessage('Dealer reveals: ' + hand.getCards()[1] + '.'));

		while (hand.getTotalValue() < 17 && hand.getTotalValue() !== 21) {
			drawnCard = deck.pop();
			hand.addCard(drawnCard);

			alert(game.getGameStatusMessage('Dealer drew: ' + drawnCard + '.'));
		}
	};


	that.declareWinner = function (playerArray) {
		// Determine the winner(s).
		var winningHandValue = 0;
		var winnerNames = [];

		// if the dealer has a possibility of winning
		if (hand.getTotalValue() < 22) {
			// initialize with the dealer as the winner.
			winningHandValue = hand.getTotalValue();
			winnerNames = [name];
		}

		for (var i = 0; i < playerArray.length; i++) {

			var playerHandValue = playerArray[i].getHand().getTotalValue();
			// If this player has the best hand value so far in the loop
			if (playerHandValue > winningHandValue && playerHandValue < 22) {
				// set it as the winner
				winningHandValue = playerHandValue;
				winnerNames = []; //empties the array
				winnerNames.push(playerArray[i].getName());
				// Or if this player has the same as the best hand value so far
			} else if (playerHandValue === winningHandValue) {
				//add it to the list of winnerNames
				winnerNames.push(playerArray[i].getName());
			}
		}
		// Print out the winner(s).
		var message = '';
		if (winnerNames.length > 1) {
			for (var x = 0; x < winnerNames.length; x++) {
				message = message + winnerNames[x] + '\n';
			}
			message = message + 'Tied, with a hand value of ' + winningHandValue + '!\n';
		} else if (winnerNames.length === 1) {
			message = winnerNames[0] + ' won with ' + winningHandValue + '!';
			alert(
				'\n' +
				'.   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .\n' +
				'.\n' +
				'.                           Yay!,                         .\n' +
				'.                        you won!                          .\n' +
				'.                                                                                              .\n' +
				'.                        .-o=o-.                            .\n' +
				'.                 ,   /=o=o=o=\\ .-.                           .\n' +
				'.               _|\\|o=O=o=O=|    \\                        .\n' +
				'.          __.\'   a`\\o=o=o=(`\\    /                     .\n' +
				'.          \'.    a 4/`|.---"""\'`\\  \\ ;\'`)  .---.             .\n' +
				'.             \\    .\'   /      .---\'    |_.\'   /  .-._)           .\n' +
				'.              `)   _.\'      /        /`-.__.\'  /                 .\n' +
				'.                `\'-.____;        /\'-._____.-\'                 .\n' +
				'.                           `"""`                                    .\n' +
				'.                                                                                      .\n' +
				'.                                                                                      .\n' +
				'.                                                                                      .\n' +
				'.    .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .\n' +
				'                                       ASCII art by jgs'
			);
		} else {
			message = 'Everyone busted!';
		}
		alert(game.getGameStatusMessage(message));
	};

	that.getHand = function () {
		return hand;
	};

	return that;
};