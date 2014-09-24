'use strict';
game.getDeck = function (numberOfDecks) {
	var that = {};
	that.cards = [];

	that.pop = function () { // exists so we can type deck.pop(), instead of deck.cards.pop()
		return that.cards.pop();
	};

	for (var i = 0; i < numberOfDecks; ++i) {
		that.cards.push(
			game.getCard('2', 'H'), game.getCard('3', 'H'), game.getCard('4', 'H'),
			game.getCard('5', 'H'), game.getCard('6', 'H'), game.getCard('7', 'H'),
			game.getCard('8', 'H'), game.getCard('9', 'H'), game.getCard('T', 'H'),
			game.getCard('J', 'H'), game.getCard('K', 'H'), game.getCard('Q', 'H'),
			game.getCard('A', 'H'),
			game.getCard('2', 'S'), game.getCard('3', 'S'), game.getCard('4', 'S'),
			game.getCard('5', 'S'), game.getCard('6', 'S'), game.getCard('7', 'S'),
			game.getCard('8', 'S'), game.getCard('9', 'S'), game.getCard('T', 'S'),
			game.getCard('J', 'S'), game.getCard('K', 'S'), game.getCard('Q', 'S'),
			game.getCard('A', 'S'),
			game.getCard('2', 'C'), game.getCard('3', 'C'), game.getCard('4', 'C'),
			game.getCard('5', 'C'), game.getCard('6', 'C'), game.getCard('7', 'C'),
			game.getCard('8', 'C'), game.getCard('9', 'C'), game.getCard('T', 'C'),
			game.getCard('J', 'C'), game.getCard('K', 'C'), game.getCard('Q', 'C'),
			game.getCard('A', 'C'),
			game.getCard('2', 'D'), game.getCard('3', 'D'), game.getCard('4', 'D'),
			game.getCard('5', 'D'), game.getCard('6', 'D'), game.getCard('7', 'D'),
			game.getCard('8', 'D'), game.getCard('9', 'D'), game.getCard('T', 'D'),
			game.getCard('J', 'D'), game.getCard('K', 'D'), game.getCard('Q', 'D'),
			game.getCard('A', 'D')
		);
	}
	return that;
};