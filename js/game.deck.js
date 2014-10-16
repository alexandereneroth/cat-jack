'use strict';
game.getDeck = function (numberOfDecks) {
	var that = {};
	that.cards = [];

	// This function exists so we can type deck.pop(), 
	// instead of deck.cards.pop()
	that.pop = function () {
		return that.cards.pop();
	};

	function addCards() {
		var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		var suits = ['H', 'S', 'C', 'D'];

		for (var i = 0; i < numberOfDecks; ++i) {
			for (var j = 0; j < ranks.length; j++) {
				for (var k = 0; k < suits.length; k++) {
					that.cards.push(game.getCard(ranks[j], suits[k]));
				}
			}
		}
	}

	function shuffle(cards) {
		var currentIndex = cards.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = cards[currentIndex];
			cards[currentIndex] = cards[randomIndex];
			cards[randomIndex] = temporaryValue;
		}
		return cards;
	}
	addCards();
	that.cards = shuffle(that.cards);
	return that;
};