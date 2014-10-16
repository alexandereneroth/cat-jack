'use strict';

$(function () {
	// Bind key listeners
	$('#hit-button').click(function () {
		cjLogic.hit();
	});
	$('#stand-button').click(function () {
		cjLogic.stand();
	});

	// cjLogic.player = cjLogic.createPlayer(prompt('Please enter your name:'));
	cjLogic.player = cjLogic.createPlayer('Player');
	cjLogic.dealer = cjLogic.createDealer('Joe the Dealer');
	cjLogic.startGame();



});