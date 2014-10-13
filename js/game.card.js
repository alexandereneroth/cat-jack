'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	//    ______________________
	//___/       PRIVATE        \___

	var rank = rank;
	var suit = suit;
	var value = makeValue();
	var name = makeName();
	var url = makeUrl();
	var isRevealed = true;

	var rankWord;
	var suitWord;

	// Sets rankWord and suitWord with text representation of 
	// card for use with makeName and makeUrl.
	function getCardText() {
		if (cjTools.isNumber(rank)) { // 2 3 4 5 6 7 8 9 10
			rankWord = rank;
		} else if (rank === 'A') {
			rankWord = 'Ace';
		} else if (rank === 'J') {
			rankWord = 'Jack';
		} else if (rank === 'Q') {
			rankWord = 'Queen';
		} else if (rank === 'K') {
			rankWord = 'King';
		} else {
			throw 'game.getCard > getName > invalid rank!';
		}
		if (suit === 'H') {
			suitWord = 'Hearts';
		} else if (suit === 'S') {
			suitWord = 'Spades';
		} else if (suit === 'C') {
			suitWord = 'Clubs';
		} else if (suit === 'D') {
			suitWord = 'Diamonds';
		} else {
			throw 'game.getCard > getName > invalid suit!';
		}
	}

	// Set text representation of cards and url
	function makeName() {
		return rankWord + ' of ' + suitWord;
	}

	function makeUrl() {
		return 'img/cards/' + rankWord.toLowerCase() + '_of_' + suitWord.toLowerCase() + '.svg';
	}

	// Returns the value of the card (in numbers)
	function makeValue() {
		var value = Number(rank);

		if (rank === 'A') { // A
			return 11;
		}
		if (isNaN(value)) { // J Q K
			return 10;
		}
		return value; // 2 3 4 5 6 7 8 9 10
	}


	//    ______________________
	//___/        PUBLIC        \___

	// Mutators
	that.flip = function () {
		isRevealed = !isRevealed;
	};
	// Accessors
	that.isRevealed = function () {
		return isRevealed;
	};
	that.getUrl = function () {
		return url;
	};
	that.getValue = function () {
		return value;
	};
	that.toString = function () {
		return name;
	};

	return that;
};