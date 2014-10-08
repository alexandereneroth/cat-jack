'use strict';

game.ui = (function () {
	// Public function to update UI
	var that = {
		updateBoard: function (gs) {
			showMessage(gs.focusMessage);
			showScore(gs.playerScore, gs.dealerScore);
			showCards(gs.playerCards, gs.dealerCards);

		}
	};

	// Private functions
	var showMessage = function (message) {
		$('#message-area p').text(message);
	};

	var showCards = function (playerCards, dealerCards) {
		// Empty the board before adding new cards
		$('#dealer').empty();
		$('#player').empty();

		// Append player & dealer card elements to the board
		$.each(playerCards, function (index, val) {
			$('#player').append(makeCardEl(val));
		});
		$.each(dealerCards, function (index, val) {
			$('#dealer').append(makeCardEl(val));
		});

	};

	var showScore = function (playerScore, dealerScore) {
		$('#dealer-score').text(dealerScore);
		$('#player-score').text(playerScore);
	};

	var makeCardImgTag = function (card) {
		var cardImg = document.createElement('img');
		cardImg.src = card.getUrl();
		cardImg.className = 'card';
		return cardImg;
	};

	var makeCardEl = function (card) {
		if (card.isRevealed()) {
			return makeCardImgTag(card); //return card frontside
		} else {
			return $('<div>').addClass('card card-back'); //return card backside 
		}
	};

	return that;
}());