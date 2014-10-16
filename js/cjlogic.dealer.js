'use strict';
cjLogic.createDealer = function (dealerName) {
	var that = {};
	//    ______________________
	//___/        PRIVATE       \___
	var name = dealerName;
	var hand = cjLogic.createHand();
	var deck;

	//    ______________________
	//___/        PUBLIC        \___
	that.getName = function () {
		return name;
	};

	that.setNumberOfCardDecks = function (numberOfDecks) {
		deck = cjLogic.getDeck(numberOfDecks);
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
		cjLogic.state.update(player.getName() + ' has received ' + drawnCard);
	};

	that.dealFirstHand = function () {

		// House and player gets two cards each.
		that.dealCardTo(cjLogic.player);
		that.dealCardTo(cjLogic.player);
		that.dealCardTo(this);
		that.dealCardTo(this);

		// Hide the second dealer card until dealer.playRound() is called
		hand.flip(1);
		cjLogic.state.update('Welcome to a new game!');
		cjController.updateBoard(cjLogic.state);

	};

	// Draw cards until the hands value is 17 or above, and under 22.
	that.playRound = function () {
		var stateHistory = [];

		var getDealerCard = function () {
			var drawnCard = deck.pop();
			hand.addCard(drawnCard);
			cjLogic.state.update('Dealer draws ' + drawnCard, false);

		};

		// Reveal hidden card
		hand.flip(1);
		cjLogic.state.update('Dealer reveals ' + hand.getCard(1), false);
		stateHistory.push(cjLogic.state.getCopy());

		// Finish the whole round and store drawn cards for replay with delay
		while (hand.getTotalValue() < 17 && hand.getTotalValue() !== 21) {
			getDealerCard();
			stateHistory.push(cjLogic.state.getCopy());
		}
		stateHistory[stateHistory.length - 1].gameOver = true;

		// Replay the gameround with delay
		for (var i = 0; i < stateHistory.length; i++) {

			(function (n) {
				var stateI = stateHistory[i];

				setTimeout(function () {
					console.dir(stateI);
					cjController.updateBoard(stateI);

				}, cjLogic.globalTimeout * n);

			}(i));
		}
	};

	that.getHand = function () {
		return hand;
	};

	return that;
};