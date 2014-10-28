'use strict';
game.getCurrentState = function () {
	var that = {};

	that.isPlayerTurn = game.isPlayerTurn;
	that.playerScore = game.player.getHand().getTotalValue();
	that.dealerScore = game.dealer.getHand().getTotalValue();
	that.dealerCards = $.extend(true, {}, game.dealer.getHand().getCards());
	that.playerCards = $.extend(true, {}, game.player.getHand().getCards());
	that.focusMessage = game.focusMessage;
	that.gameOver = game.isGameOver();

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

	return that;
};