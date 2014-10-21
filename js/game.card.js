'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	//Invalid argument check
	if (isNaN(rank) && -1 === $.inArray(rank, ['Ace', 'Jack', 'Queen', 'King'])) {
		throw 'rank is NaN but is not "Ace","Jack","Queen", or "King"';
	} else if (rank < 2 && rank > 10) {
		throw 'rank is numeric but is out of range.';
	}
	if (-1 === $.inArray(suit, ['Hearts', 'Spades', 'Clubs', 'Diamonds'])) {
		throw 'suit is not "Hearts", "Spades", "Clubs", or "Diamonds".';
	}
	//    _____________________
	//___/       PRIVATE       \___

	var value = buildValue();
	var name = buildName();
	var url = buildUrl();
	var isRevealed = true;

	// Set text representation of cards and url
	function buildName() {
		return rank + ' of ' + suit;
	}

	function buildUrl() {
		return 'img/cards/' + rank + '_of_' + suit + '.svg';
	}
	// Returns the value of the card (in numbers)
	function buildValue() {
		var value = Number(rank);

		if (rank === 'Ace') { // A
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