'use strict';
game.getActor = function () {
	var that = {};

	var hand = game.getHand();

	that.drawCard = function () {
		var card = game.deck.pop();
		hand.push(card);
		return card;
	};
	that.flipCard = function (idx) {
		hand.flip(idx);
	};
	that.getHand = function () {
		return hand;
	};
	return that;
};