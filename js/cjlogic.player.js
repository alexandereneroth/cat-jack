'use strict';
game.m.createPlayer = function (playerName) {
	var that = {};
	var name = playerName;
	var bank = 100;
	var hand = game.m.createHand();

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