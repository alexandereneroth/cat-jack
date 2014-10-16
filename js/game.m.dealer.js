'use strict';
game.m.createDealer = function (dealerName) {
	var that = {};
	//    ______________________
	//___/        PRIVATE       \___

	var player = game.m.createPlayer(dealerName);
	var deck;

	function getHand() {
		return player.getHand();
	}

	//    ______________________
	//___/        PUBLIC        \___
	that.getName = function () {
		return name;
	};

	that.setNumberOfCardDecks = function (numberOfDecks) {
		deck = game.m.getDeck(numberOfDecks);
	};

	that.dealCardTo = function (plr) {
		var drawnCard = deck.pop();
		plr.getHand().addCard(drawnCard);
		game.m.state.update(player.getName() + ' has received ' + drawnCard);
	};

	that.shuffleDeck = function () {
		deck.shuffle();
	};

	that.dealFirstHand = function () {

		// House and player gets two cards each.
		that.dealCardTo(game.m.player);
		that.dealCardTo(game.m.player);
		that.dealCardTo(this);
		that.dealCardTo(this);

		// Hide the second dealer card until dealer.playRound() is called
		getHand().flip(1);
		game.m.state.update('Welcome to a new game!');
		game.c.updateBoard(game.m.state);

	};

	// Draw cards until the hands value is 17 or above, and under 22.
	that.playRound = function () {
		var stateHistory = [];

		var getDealerCard = function () {
			var drawnCard = deck.pop();
			getHand().addCard(drawnCard);
			game.m.state.update('Dealer draws ' + drawnCard, false);

		};

		// Reveal hidden card
		getHand().flip(1);
		game.m.state.update('Dealer reveals ' + getHand().getCard(1), false);
		stateHistory.push(game.m.state.getCopy());

		// Finish the whole round and store drawn cards for replay with delay
		while (getHand().getTotalValue() < 17) {
			getDealerCard();
			stateHistory.push(game.m.state.getCopy());
		}
		stateHistory[stateHistory.length - 1].gameOver = true;

		// Replay the gameround with delay
		for (var i = 0; i < stateHistory.length; i++) {

			(function (n) {
				setTimeout(function () {

					game.c.updateBoard(stateHistory[n]);

				}, game.m.globalTimeout * n);

			}(i));
		}
	};

	that.getHand = function () {
		return getHand();
	};

	return that;
};