'use strict';
game.events = (function () {
	var that = {};

	that.playerHit = function () {
		if (game.isPlayerTurn) {
			game.player.drawCard();

			var state = game.getCurrentState();
			game.controller.updateBoard(state);

			if (state.playerScore > 21) {
				game.focusMessage = 'Player Bust!';
				game.controller.updateBoard(game.getCurrentState());

				game.isPlayerTurn = false;

				that.startDealerTurn();
			}
		}
	};

	that.playerStand = function () {
		if (game.isPlayerTurn) {
			game.isPlayerTurn = false;

			that.startDealerTurn();
		}
	};

	that.dealFirstHand = function () {
		game.player.drawCard();
		game.player.drawCard();

		game.dealer.drawCard();
		game.dealer.drawCard();

		// Hide the second dealer card in the beginning.
		game.dealer.flipCard(1);
		game.focusMessage = 'Welcome to a new game!';
		game.controller.updateBoard(game.getCurrentState());

	};

	// Draw cards until the hands value is 17 or above, and under 22.
	that.startDealerTurn = function () {

		// Reveal hidden card
		game.dealer.flipCard(1);

		game.focusMessage = 'Dealer reveals ' + game.dealer.getHand().getCard(1);

		game.controller.updateBoardIn(game.getCurrentState(), game.globalTimeout);

		// Draw cards until value of hand is over 16, and set timers to update 
		// the board in timed intervals
		var i = 2;
		while (game.dealer.getHand().getTotalValue() < 17) {

			var drawnCard = game.dealer.drawCard();

			game.focusMessage = 'Dealer draws ' + drawnCard;

			game.controller.updateBoardIn(game.getCurrentState(), game.globalTimeout * i++);
		}

	};

	return that;
}());