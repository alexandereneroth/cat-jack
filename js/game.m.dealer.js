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
		game.m.state.update(plr.getName() + ' has received ' + drawnCard);
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
	that.playTurn = function () {

		// Reveal hidden card
		getHand().flip(1);

		// Update the game's state with a message of the flipped card 
		// and a boolean that tells if the game is over or not
		game.m.state.update('Dealer reveals ' + getHand().getCard(1), (getHand().getTotalValue() >= 17));

		game.c.updateBoardIn(game.m.state.getCopy(), game.m.globalTimeout);

		// Draw cards until value of hand is over 16, and set timers to update 
		// the board in timed intervals
		var i = 2;
		while (getHand().getTotalValue() < 17) {

			var drawnCard = deck.pop();
			getHand().addCard(drawnCard);

			game.m.state.update('Dealer draws ' + drawnCard, (getHand().getTotalValue() >= 17));

			game.c.updateBoardIn(game.m.state.getCopy(), game.m.globalTimeout * i++);
		}

	};

	that.getHand = function () {
		return getHand();
	};

	return that;
};