'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	// Returns different special unicode pictogram suit symbols,
	// depending on what suit the card is of.
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
			// Shows the string (which is throwed) as an  
			// error message if this line is ever reached
			throw 'invalid suit identifier';
		}
	};

	// returns top row part of the ASCII art card picture
	function getCardTopRow(rank) {
		var row = '';
		row += '|';
		// Tens have two symbols in their rank, and thus require less spaces
		if (rank === 'T') {
			row += '10   ' + getSuitSymbol();
			// 'J' looks better if it is indented 1 space into the card
		} else if (rank === 'J') {
			row += ' ' + rank + '      ' + getSuitSymbol();

			// 'J' and the spades symbol take up far less vertical space than other 
			// characters so more spaces are needed.
		} else if (rank === 'J' && suit === 'S') {
			row += ' ' + rank + '      ' + getSuitSymbol();
		} else {
			row += rank + '     ' + getSuitSymbol();
		}

		row += '|';

		return row;
	};

	// returns bottom row part of the ASCII art card picture (reversed order of the top row)
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

	that.picture = [
		' ______ ',
		getCardTopRow(rank),
		'|         |',
		'|         |',
		getCardBottomRow(rank),
		' \uFFE3\uFFE3\uFFE3 ' //code for the special character ¯. (FULLWIDTH MACRON)
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