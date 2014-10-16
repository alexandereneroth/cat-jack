'use strict';
game.m.getDeck = function (numberOfDecks) {
	var that = {};
	that.cards = [];

	// This function exists so we can type deck.pop(), 
	// instead of deck.cards.pop()
	that.pop = function () {
		return that.cards.pop();
	};


	var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	var suits = ['H', 'S', 'C', 'D'];

	for (var i = 0; i < numberOfDecks; ++i) {
		for (var j = 0; j < ranks.length; j++) {
			for (var k = 0; k < suits.length; k++) {
				that.cards.push(game.m.getCard(ranks[j], suits[k]));
			}
		}
	}
	return that;
};