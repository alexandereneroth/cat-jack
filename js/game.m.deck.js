'use strict';
game.m.getDeck = function (numberOfDecks) {
	var that = {};

	//    _____________________
	//___/       PRIVATE       \___
	function buildDeck() {
		var deck = [];
		var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		var suits = ['H', 'S', 'C', 'D'];

		for (var i = 0; i < numberOfDecks; ++i) {
			for (var j = 0; j < ranks.length; j++) {
				for (var k = 0; k < suits.length; k++) {
					deck.push(game.m.getCard(ranks[j], suits[k]));
				}
			}
		}
		return deck;
	}

	//    ____________________
	//___/       PUBLIC       \___

	that.deck = buildDeck();

	// This function exists so we can type deck.pop(), 
	// instead of deck.cards.pop()
	that.pop = function () {
		return that.deck.pop();
	};

	that.shuffle = function () {
		var cards = that.deck;

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
	};



	return that;
};