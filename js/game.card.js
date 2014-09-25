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
		' ______ ',
		'|' + (rank !== 'T' ? rank + '     ' + getSuitSymbol() : '10   ' + getSuitSymbol()) + '|', // Inline if statement, which is used to handle the special case of tens ('10' instad of 'T' which also makes it two letters instad of one)
		'|         |',
		'|         |',
		'|' + (rank !== 'T' ? getSuitSymbol() + '     ' + rank : getSuitSymbol() + '   10') + '|',
		' \uFFE3\uFFE3\uFFE3 '
	];
	that.getPictureWithNewlines = function () {
		var pictureWithNewlines = '';
		for (var i = 0; i < that.picture.length; ++i) {
			pictureWithNewlines += that.picture[i] + '\n';
		}
		return pictureWithNewlines;
	};
	that.toString = function () {
		return that.id;
	};

	return that;
};