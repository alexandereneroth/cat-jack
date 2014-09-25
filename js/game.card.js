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

	function getCardTopRow(rank) {
		var row = '';
		row += '|';

		if (rank === 'T') {
			row += '10   ' + getSuitSymbol();
		} else if (rank === 'J') {
			row += ' ' + rank + '      ' + getSuitSymbol();

		} else if (rank === 'J' && suit === 'S') {
			row += ' ' + rank + '      ' + getSuitSymbol();
		} else {
			row += rank + '     ' + getSuitSymbol();
		}

		row += '|';

		return row;
	};

	function getCardBottomRow(rank) {
		var row = '';
		row += '|';

		if (rank === 'T') {
			row += getSuitSymbol() + '   10';
		} else if (rank === 'J') {
			row += getSuitSymbol() + '      ' + rank + ' ';

		} else if (rank === 'J' && suit === 'S') {
			row += getSuitSymbol() + '      ' + rank + ' ';
		} else {
			row += getSuitSymbol() + '     ' + rank;
		}

		row += '|';

		return row;
	};

	that.id = rank + suit; // Used when the old format for representing cards is needed (2H,TC,AS,4D, etc)
	that.rank = rank;
	that.suit = suit;

	// Inline if statement, which is used to handle the special case of tens 
	// ('10' instad of 'T' which also makes it two letters instad of one)
	that.picture = [
		' ______ ',
		getCardTopRow(rank),
		'|         |',
		'|         |',
		getCardBottomRow(rank),
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