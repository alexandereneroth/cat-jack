'use strict';

// Constructor function to get a deck of cards for the game.
// Returns shuffled array with the specified number of cards (52 cards in a deck).
game.createDeck = function (numberOfDecks) {
	/* * * * * *
	 * Private *
	 * * * * * */
	var cards = [];
	getCards();
	shuffle();

	function getCards() {
		var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		var suits = ['H', 'S', 'C', 'D'];

		function addCards() {
			ranks.forEach(function (rank) {
				suits.forEach(function (suit) {
					cards.push(game.createCard(rank, suit));
				});
			});
		}

		// Push all the cards into the a new deck
		while (numberOfDecks > 0) {
			addCards();
			numberOfDecks -= 1;
		}
	}

	function shuffle() {
		var currentIndex = cards.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex > 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = cards[currentIndex];
			cards[currentIndex] = cards[randomIndex];
			cards[randomIndex] = temporaryValue;
		}
	}

	/* * * * * *
	 * Public  *
	 * * * * * */
	var deck = {}; // Public functions and properties are returned with this object

	// This function exists so we can type deck.pop() 
	// instead of deck.cards.pop()
	deck.pop = function () {
		return cards.pop();
	};
	return deck;
};