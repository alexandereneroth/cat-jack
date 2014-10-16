'use strict';
game.m.createPlayer = function (playerName) {
	var that = {};
	var name = playerName;
	var hand = game.m.createHand();

	that.getHand = function () {
		return hand;
	};

	that.getName = function () {
		return name;
	};

	return that;
};