'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	function getSuitSymbol() {
		if (suit === 'H') {
			return 'v';
		} else if (suit === 'S') {
			return '^';
		} else if (suit === 'C') {
			return '&';
		} else if (suit === 'D') {
			return 'o';
		} else {
			throw 'invalid suit identifier';
		}
	};

	that.id = rank + suit;
	that.rank = rank;
	that.suit = suit;

	that.picture = ' _____ 
|' + rank + '    |
|     |
|  ' + getSuitSymbol() + '  |
|     |
|____' + rank + '|';

};

game.getDeck = function () {
	var that = {};
	that.cards = [
		game.getCard('2', 'heart'), game.getCard('3', 'heart'), game.getCard('4', 'heart'),
		game.getCard('5', 'heart'), game.getCard('6', 'heart'), game.getCard('7', 'heart'),
		game.getCard('8', 'heart'), game.getCard('9', 'heart'), game.getCard('T', 'heart'),
		game.getCard('J', 'heart'), game.getCard('K', 'heart'), game.getCard('Q', 'heart'),
		game.getCard('A', 'heart'),
		game.getCard('2', 'spade'), game.getCard('3', 'spade'), game.getCard('4', 'spade'),
		game.getCard('5', 'spade'), game.getCard('6', 'spade'), game.getCard('7', 'spade'),
		game.getCard('8', 'spade'), game.getCard('9', 'spade'), game.getCard('T', 'spade'),
		game.getCard('J', 'spade'), game.getCard('K', 'spade'), game.getCard('Q', 'spade'),
		game.getCard('A', 'spade'),
		game.getCard('2', 'club'), game.getCard('3', 'club'), game.getCard('4', 'club'),
		game.getCard('5', 'club'), game.getCard('6', 'club'), game.getCard('7', 'club'),
		game.getCard('8', 'club'), game.getCard('9', 'club'), game.getCard('T', 'club'),
		game.getCard('J', 'club'), game.getCard('K', 'club'), game.getCard('Q', 'club'),
		game.getCard('A', 'club'),
		game.getCard('2', 'diamond'), game.getCard('3', 'diamond'), game.getCard('4', 'diamond'),
		game.getCard('5', 'diamond'), game.getCard('6', 'diamond'), game.getCard('7', 'diamond'),
		game.getCard('8', 'diamond'), game.getCard('9', 'diamond'), game.getCard('T', 'diamond'),
		game.getCard('J', 'diamond'), game.getCard('K', 'diamond'), game.getCard('Q', 'diamond'),
		game.getCard('A', 'diamond')
	];
	return that;
};