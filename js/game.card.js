'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	//    ______________________
	//___/       PRIVATE        \___

	// Returns a simple text representation of the card
	function getName() {
		var rankWord = '';
		var suitWord = '';

		if (!isNaN(Number(rank))) { // 2 3 4 5 6 7 8 9 10
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
	function getValue() {
		var value = Number(rank);

		if (rank === 'A') { // A
			return 11;
		}
		if (isNaN(value)) { // J Q K
			return 10;
		}
		return value; // 2 3 4 5 6 7 8 9 10
	}

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
			throw 'game.getCard > getSuitSymbol > invalid suit!';
		}
	}

	// @returns The top row part of the ASCII-art card picture
	function getPictureTopRow() {
		var row = '|';
		// 'J' looks better if it is indented 1 space into the card
		if (rank === 'J') {
			row += ' ';

		}
		// Tens have two symbols in their rank, and thus require less spaces
		if (rank === '10') {
			row += rank + getSpaces(3);

		} else {
			row += rank + getSpaces(5);
		}

		return row + getSuitSymbol() + '|';
	}

	// @returns The bottom row part of the ASCII-art card picture 
	// (reversed order of the top row)
	function getPictureBottomRow() {
		var row = '|' + getSuitSymbol();
		if (rank === '10') {

			row += getSpaces(3) + rank;

		} else {

			row += getSpaces(5) + rank;
		}
		if (rank === 'J') {
			row += ' ';
		}

		return row + '|';
	}

	function getSpaces(amount) {
		var spaces = '';
		while (amount-- > 0) {
			spaces += ' ';
		}
		return spaces;
	}

	//    ______________________
	//___/        PUBLIC        \___

	that.rank = rank;
	that.suit = suit;
	that.value = (getValue());
	that.name = (getName());
	that.isFrontsideUp = true; // used for representing flipping of the card

	// It's important that frontside and backside have the same amount of rows
	// so that methods iterating over both of them (for example) can treat  
	// them as interchangable.
	that.frontside = [
		' ______ ',
		getPictureTopRow(rank),
		'|         |',
		'|         |',
		getPictureBottomRow(rank),
		' \uFFE3\uFFE3\uFFE3 ' //code for the special character 'FULLWIDTH MACRON'.
	];

	that.backside = [
		' ______ ',
		'|\u262F   \u262F|',
		'|         |',
		'|         |',
		'|\u262F   \u262F|',
		' \uFFE3\uFFE3\uFFE3 ' //code for the special character 'FULLWIDTH MACRON'.
	];

	that.toString = function () {
		return that.name;
	};

	// Returns the backside or the frontside, depending on how the card is flipped.
	that.getPictureArray = function () {
		if (that.isFrontsideUp) {
			return that.frontside;
		} else {
			return that.backside;
		}
	};

	that.getPictureString = function () {
		var upside = that.getPictureArray();

		var pictureString = '';
		for (var i = 0; i < upside.length; ++i) {
			pictureString += upside[i] + '\n';
		}
		return pictureString;
	};

	that.flip = function () {
		// sets the bool 'isFrontsideUp' to its opposite value
		that.isFrontsideUp = !that.isFrontsideUp;
	};

	return that;
};