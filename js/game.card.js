'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	function getSuitSymbol() {
		if (suit === 'H') {
			return '\u2665'; // These are the unicode codes for the different suit symbols
		} else if (suit === 'S') {
			return '\u2660';
		} else if (suit === 'C') {
			return '\u2663';
		} else if (suit === 'D') {
			return '\u2666';
		} else {
			throw 'invalid suit identifier'; // Shows the string (which is throwed) as an error message if this line is ever reached
		}
	};

	that.id = rank + suit; // Used when the old format for representing cards is needed (2H,TC,AS,4D, etc)
	that.rank = rank;
	that.suit = suit;
	that.picture = [
		' _____ ',
		'|' + (rank !== 'T' ? rank + ' ' : '10') + '   |', // Inline if statement, which is used to handle the special case of tens ('10' instad of 'T' which also makes it two letters instad of one)
		'|     |',
		'|  ' + getSuitSymbol() + '  |',
		'|     |',
		'|___' + (rank !== 'T' ? '_' + rank : '10') + '|'
	];
	that.toString = function () {
		return that.id;
	}

	return that;
};