'use strict';
game.m.state = {

	playerScore: 0,
	dealerScore: 0,
	dealerCards: [],
	playerCards: [],
	focusMessage: '',
	resultMessage: '',

	update: function (focusMessage, gameOver) {

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
	},

	//returns 0 for tie, negative for loss, and positive for win
	getWinState: function () {
		console.log('test');

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
	},

	getCopy: function () {
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
	}
};