'use strict';

// Card constructor, returns object with all the needed properties
// and functions.
game.getCard = function (rank, suit) {

	/* * * * * *
	 * Private *
	 * * * * * */
	var isRevealed = true;
	var rankWord = getRankWord();
	var suitWord = getSuitWord();
	var value = getValue();
	var url = getUrl();

	function getRankWord() {
		if ($.isNumeric(rank)) { // 2 3 4 5 6 7 8 9 10
			return rank;
		} else if (rank === 'A') {
			return 'Ace';
		} else if (rank === 'J') {
			return 'Jack';
		} else if (rank === 'Q') {
			return 'Queen';
		} else if (rank === 'K') {
			return 'King';
		} else {
			throw 'game.getCard > getName > invalid rank!';
		}
	}

	function getSuitWord() {
		if (suit === 'H') {
			return 'Hearts';
		} else if (suit === 'S') {
			return 'Spades';
		} else if (suit === 'C') {
			return 'Clubs';
		} else if (suit === 'D') {
			return 'Diamonds';
		} else {
			throw 'game.getCard > getName > invalid suit!';
		}
	}

	function getValue() {
		// If it is a letter card return 11 or 10..
		if (rank === 'A') {
			return 11;
		} else if ('J' || 'Q' || 'K') {
			return 10;
		} else { // otherwise return the rank itself
			return Number(rank);
		}
	}

	function getUrl() { // For card image file
		return 'img/cards/' + rankWord.toLowerCase() + '_of_' + suitWord.toLowerCase() + '.svg';
	}

	/* * * * * *
	 * Public  *
	 * * * * * */
	var card = {}; // Public functions are returned with this object

	card.flip = function () {
		isRevealed = !isRevealed;
	};
	card.isRevealed = function () {
		return isRevealed;
	};
	card.getUrl = function () {
		return url;
	};
	card.getValue = function () {
		return value;
	};
	card.toString = function () { // Text representation of card, i.e. '9 of clubs'
		return rankWord + ' of ' + suitWord;
	};

	// Return the public functions
	return card;
};