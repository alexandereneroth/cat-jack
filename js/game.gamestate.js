game.gameState = {

	playerScore: 0,
	dealerScore: 0,
	dealerCards: [],
	playerCards: [],
	focusMessage: '',
	resultMessage: '',
	history: [],

	update: function (focusMessage, gameOver) {

		// Storing variables for shorter reference below
		var gameState = game.gameState;
		var playerHand = game.player.getHand();
		var dealerHand = game.dealer.getHand();

		gameState.playerCards = playerHand.getCards();
		gameState.dealerCards = dealerHand.getCards();
		gameState.playerScore = playerHand.getTotalValue();
		gameState.dealerScore = dealerHand.getTotalValue();
		gameState.focusMessage = focusMessage;
		gameState.gameOver = gameOver;
	},

	//returns 0 for tie, negative for loss, and positive for win
	getWinState: function () {

		// Storing variables for shorter reference below
		var playerScore = game.gameState.playerScore;
		var dealerScore = game.gameState.dealerScore;

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
		var gs = game.gameState;

		var copy = {
			playerCards: [],
			dealerCards: [],
			playerScore: gs.playerScore,
			dealerScore: gs.dealerScore,
			focusMessage: gs.focusMessage,
			gameOver: gs.gameOver
		}
		for (var i = 0; i < gs.playerCards.length; ++i) {
			copy.playerCards.push(gs.playerCards[i]);
		}

		for (var j = 0; j < gs.dealerCards.length; ++j) {
			copy.dealerCards.push(gs.dealerCards[j]);
		}
		return copy;
	}
};