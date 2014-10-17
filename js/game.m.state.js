'use strict';
game.m.state = (function () {
	var that = {};

	//    ______________________
	//___/        PUBLIC        \___

	that.playerScore = 0;
	that.dealerScore = 0;
	that.dealerCards = [];
	that.playerCards = [];
	that.focusMessage = '';
	that.resultMessage = '';

	that.update = function (focusMessage, gameOver) {

		// Storing variables for shorter reference below
		var state = game.m.state;
		var playerHand = game.m.player.getHand();
		var dealerHand = game.m.dealer.getHand();

		state.playerCards = playerHand.getCards();
		state.dealerCards = dealerHand.getCards();
		state.playerScore = playerHand.getTotalValue();
		state.dealerScore = dealerHand.getTotalValue();
		state.focusMessage = focusMessage;
		state.gameOver = gameOver;
	};

	//returns 0 for tie, negative for loss, and positive for win
	that.getWinState = function () {

		// Storing variables for shorter reference below
		var playerScore = this.playerScore;
		var dealerScore = this.dealerScore;

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

	that.getCopy = function () {
		var copy = {
			playerCards: [],
			dealerCards: [],
			playerScore: this.playerScore,
			dealerScore: this.dealerScore,
			focusMessage: this.focusMessage,
			gameOver: this.gameOver,
			update: this.update,
			getWinState: this.getWinState,
			getCopy: this.getCopy
		};
		for (var i = 0; i < this.playerCards.length; ++i) {
			copy.playerCards.push(this.playerCards[i]);
		}

		for (var j = 0; j < this.dealerCards.length; ++j) {
			copy.dealerCards.push(this.dealerCards[j]);
		}
		return copy;
	};

	return that;
}());