'use strict';
game.createPlayer = function (playerName) {
	var that = {};
	var name = playerName;
	var bank = 100;
	var hand = game.createHand();

	that.getHand = function () {
		return hand;
	};

	that.getName = function () {
		return name;
	};

	that.getBank = function () {
		return bank;
	};

	return that;
};