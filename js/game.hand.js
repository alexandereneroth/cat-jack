'use strict';
game.createHand = function () {
	var that = {},
		cards = [],
		numberOfAces = 0,
		totalValue = 0;

	that.getTotalValue = function () {
		return totalValue;
	};

	// TODO > Replace every use of this method by card.value, then remove this method
	that.getCardValue = function (cardObject) {
		var card = cardObject.id;
		var cardValue = 0;
		if (isNaN(Number(card[0]))) {
			if (card[0] === 'A') { // The card is an A.
				cardValue = 11;
			} else { // The card is either a T, J, Q, K
				cardValue = 10;
			}
		} else { // If 2, 3, 4, 5, 6, 7, 8, 9
			cardValue = Number(card[0]);
		}
		return cardValue;
	};

	that.getCards = function () {
		return cards;
	};

	// Returns a string that contains an ASCII art representation of all 
	// the cards in the hand, together.
	that.getCardString = function () {
		var cardString = '';
		var pictureRows = cards[0].picture.length;
		for (var row = 0; row < pictureRows; ++row) { // for each row index
			for (var card = 0; card < cards.length; ++card) { // go through all cards
				// and append each cards row with the current row index to cardString
				cardString += cards[card].picture[row] + '  ';
			}
			// when the current row of all cards have been added, append a
			// new line to the end of cardString, then continue to the next row index
			cardString += '\n';
		}
		return cardString;
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