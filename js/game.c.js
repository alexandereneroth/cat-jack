'use strict';
/**
 **	The controller that acts as an interface between the view (HTML & CSS),
 **	and the model (game.m).
 **/
game.c = (function () {
	var that = {};

	//    _____________________
	//___/       PRIVATE       \____

	var updateMessage = function (message) {
		$('#message-area p').text(message);
	};

	var updateCards = function (playerCards, dealerCards) {
		// Empty the board before adding new cards
		$('#dealer').empty();
		$('#player').empty();

		// Append player & dealer card elements to the board
		$.each(playerCards, function (index, val) {
			$('#player').append(makeCardElement(val));
		});
		$.each(dealerCards, function (index, val) {
			$('#dealer').append(makeCardElement(val));
		});

	};

	var updateScore = function (playerScore, dealerScore) {

		function styleScore(element, score) {
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
		styleScore($('#dealer-score'), dealerScore);
		styleScore($('#player-score'), playerScore);
	};

	// Utility
	var makeCardElement = function (card) {
		if (card.isRevealed()) {
			//return card frontside
			return $('<img>').attr('src', card.getUrl()).addClass('card fade-in-anim');
		} else {
			//return card backside 
			return $('<div>').addClass('card card-back fade-in-anim');
		}
	};

	//    ____________________
	//___/       PUBLIC       \____

	that.updateBoard = function (gs) {

		if (!(gs instanceof Object) || gs === undefined) {
			throw 'Invalid gameState';
		}

		updateMessage(gs.focusMessage);
		updateScore(gs.playerScore, gs.dealerScore);
		updateCards(gs.playerCards, gs.dealerCards);

		if (gs.gameOver) {

			setTimeout(function () {
				var winState = gs.getWinState();

				if (winState > 0) { // WIN
					updateMessage('YOU WON!');
					$('.smiling-cat').addClass('spin-anim');
				} else if (winState < 0) { // LOSE
					updateMessage('YOU LOST!');
					$('.smiling-cat').addClass('tilt-grayscale-anim');
				} else { // TIE
					updateMessage('You tied!');
				}

			}, game.m.globalTimeout);

		}
	};

	that.updateBoardIn = function (gs, milliseconds) {
		console.log('ms: ' + milliseconds, gs);
		setTimeout(function () {
			that.updateBoard(gs);
		}, milliseconds);
	};

	return that;
}());