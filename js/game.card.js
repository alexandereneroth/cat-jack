'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	function getSuitSymbol() {
		if (suit === 'H') {
			return '\u2665';
		} else if (suit === 'S') {
			return '\u2660';
		} else if (suit === 'C') {
			return '\u2663';
		} else if (suit === 'D') {
			return '\u2666';
		} else {
			throw 'invalid suit identifier';
		}
	};

	that.id = rank + suit;
	that.rank = rank;
	that.suit = suit;
	that.picture = [
		' _____ ',
		'|' + (rank !== 'T' ? rank + ' ' : '10') + '   |',
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