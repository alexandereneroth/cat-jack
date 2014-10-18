'use strict';

// Card constructor function.
// Returns object with all the needed properties and functions.
game.getCard = function (rank, suit) {

	/* * * * * *
	 * Private *
	 * * * * * */
	var stringLibrary = {
		A: 'Ace',
		K: 'King',
		Q: 'Queen',
		J: 'Jack',
		H: 'Hearts',
		S: 'Spades',
		C: 'Clubs',
		D: 'Diamonds'
	};

	var isRevealed = true,
		rankString = getString(rank),
		suitString = getString(suit),
		value = getValue(),
		url = getUrl();

	function getString(key) {
		if ($.isNumeric(key)) { // If we have a number just use it directly
			return rank;
		} else { // Otherwise return the correct string from library
			return stringLibrary[key];
		}
	}

	function getValue() {
		// If it is a letter card return 11 or 10..
		if (rank === 'A') {
			return 11;
		} else if (!$.isNumeric(rank)) { // is not numeric
			return 10;
		} else { // otherwise return the rank itself
			return Number(rank);
		}
	}

	function getUrl() { // For card image file
		return 'img/cards/' + rankString + '_of_' + suitString + '.svg';
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
		return rankString + ' of ' + suitString;
	};

	// Return the public functions
	return card;
};