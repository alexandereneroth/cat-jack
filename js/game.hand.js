'use strict';
game.createHand = function () {
	var that = {},
		cards = [],
		numberOfAces = 0,
		totalValue = 0;

	that.getTotalValue = function () {
		return totalValue;
	};

	that.getCards = function () {
		return cards;
	};
	that.getCard = function (index) {
		return cards[index];
	};

	that.addCard = function (card) {
		cards.push(card);
		totalValue += card.value;

		// Ace management
		if (card.value === 11) { // If the card that was added is an ace
			numberOfAces++;
		}
		if (totalValue > 21) { // If the value of the hand is over 21
			if (numberOfAces > 0) { // and there are aces in the hand
				totalValue -= 10; // change the value of an ace to 1
				numberOfAces--;
			}
		}
	};

	return that;
};