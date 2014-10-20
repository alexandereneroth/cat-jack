'use strict';

// Constructor function to create a hand for either dealer or player.
// Returns object with public functions.
game.createHand = function () {
	/* * * * * *
	 * Private *
	 * * * * * */
	var cards = [],
		numberOfAces = 0,
		totalValue = 0,
		lastCard = [];

	/* * * * * *
	 * Public  *
	 * * * * * */
	var hand = {}; // Public functions are returned with this object

	hand.flip = function (cardId) {
		var card = cards[cardId];
		card.flip();

		if (card.isRevealed()) {
			// Add value of card from totalValue when it is revealed
			totalValue += card.getValue();
		} else {
			// Remove value of card from totalValue when it is hidden
			totalValue -= card.getValue();
		}
	};

	hand.getTotalValue = function () {
		return totalValue;
	};

	hand.getCards = function () {
		return cards;
	};

	hand.addCard = function (card) {
		cards.push(card);
		lastCard = card;
		totalValue += card.getValue();

		// Ace management
		if (card.getValue() === 11) { // If the card that was added is an ace
			numberOfAces += 1;
		}
		if (totalValue > 21) { // If the value of the hand is over 21
			if (numberOfAces > 0) { // and there are aces in the hand
				totalValue -= 10; // change the value of an ace to 1
				numberOfAces -= 1;
			}
		}
	};

	hand.getLastCard = function () {
		return lastCard;
	};

	return hand;
};