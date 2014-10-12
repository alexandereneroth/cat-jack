'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	//    ______________________
	//___/       PRIVATE        \___

	var rank = rank;
	var suit = suit;
	var value = makeValue();
	var name = makeName();
	var isRevealed = true;
	var url = makeUrl(rank, suit);

	// Returns a simple text representation of the card
	function makeName() {

		var rankWord = '';
		var suitWord = '';

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

		return rankWord + ' of ' + suitWord;
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

	// TODO: makeUrl can use name / makeName to get correct url instead 
	// current solution
	function makeUrl(rank, suit) {
		switch (suit) {
		case 'H':
			suit = 'hearts';
			break;
		case 'D':
			suit = 'diamonds';
			break;
		case 'C':
			suit = 'clubs';
			break;
		case 'S':
			suit = 'spades';
			break;
		}

		switch (rank) {
		case 'J':
			rank = 'jack';
			break;
		case 'Q':
			rank = 'queen';
			break;
		case 'K':
			rank = 'king';
			break;
		case 'A':
			rank = 'ace';
			break;
		}
		var url = 'img/cards/' + rank + '_of_' + suit + '.svg';
		return url;
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