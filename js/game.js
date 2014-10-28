'use strict';
var game = (function () {
	var that = {};

	that.deck = {};
	that.player = {};
	that.dealer = {};

	that.globalTimeout = 1400;

	that.isPlayerTurn = true;
	that.focusMessage = '';

	that.isGameOver = function () {
		return that.dealer.getHand().getTotalValue() >= 17;
	};

	that.start = function () {

		that.deck = game.getDeck(4).shuffle();
		that.player = game.getActor();
		that.dealer = game.getActor();

		game.events.dealFirstHand(game.player);

	};

	return that;
}());