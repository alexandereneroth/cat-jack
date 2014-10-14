'use strict';
game.createPlayer = function (playerName) {
	var that = {};

	that.name = playerName;
	that.hand = game.createHand();

	that.getHand = function () {
		return that.hand;
	};

	that.getName = function () {
		return that.name;
	};

	return that;
};