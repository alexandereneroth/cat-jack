'use strict';
game.ui = (function () {
	/* * * * * *
	 * Private *
	 * * * * * */

	// The middle text box area.
	var showMessage = function (message) {
		$('#message-area p').text(message);
	};

	// Takes two arrays of cards and displays them
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
		function styleScoreEl(element, score) {
			// Check for certain scores to add animation for Bust and CatJack
			if (score > 21) {
				score += ' - BUST';
				element.addClass('bust-anim');
			}
			if (score === 21) {
				score += ' - CATJACK';
				element.addClass('catjack-anim');
			}
			element.text(score);
		}

		// Call above function with scores
		styleScoreEl($('#dealer-score'), dealerScore);
		styleScoreEl($('#player-score'), playerScore);
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

	/* * * * * *
	 * Public  *
	 * * * * * */
	var ui = {}; // Public functions are returned with this object

	/* updateBoard(), takes gamestate object as argument or uses current values.
	 * This way it can be used both for updating during the player round and for
	 * replaying gameStateHistory for dealer.
	 */
	ui.updateBoard = function (gs) {
		gs = typeof gs !== 'undefined' ? gs : { // if no gs is sent use current values
			playerScore: game.playerScore,
			dealerScore: game.dealerScore,
			playerCards: game.playerCards,
			dealerCards: game.dealerCards,
			focusMessage: game.focusMessage,
			gameOver: game.gameOver
		};
		showMessage(gs.focusMessage);
		showScore(gs.playerScore, gs.dealerScore);
		showCards(gs.playerCards, gs.dealerCards);

		if (gs.gameOver === true) {
			ui.displayWinner();
		}
	};

	ui.displayWinner = function () {
		setTimeout(function () {
			var winner = game.dealer.getWinner();
			if (winner > 0) {
				showMessage('YOU WON!');
				$('.smiling-cat').addClass('spin-anim');
			} else if (winner < 0) {
				showMessage('YOU LOST!');
				$('.smiling-cat').addClass('tilt-grayscale-anim');
			} else {
				showMessage('You tied!');
			}
		}, game.globalTimeout);
	};
	return ui;
})();