/*globals game:true */

'use strict';

var cjLogic = {
	player: {},
	dealer: {},
	isPlayerRound: true,
	globalTimeout: 1800,

	startGame: function () {

		// Main game function calls
		cjLogic.dealer.setNumberOfCardDecks(4);
		cjLogic.dealer.shuffleDeck();

		cjLogic.dealer.dealFirstHand(cjLogic.player);
	},

	playerRound: function () {},

	dealerRound: function () {
		cjLogic.dealer.playRound();
	},

	hit: function () {
		console.log('hit');
		if (cjLogic.isPlayerRound) { // Will disable button if it's not the playersround
			cjLogic.dealer.dealCardTo(cjLogic.player, 1);
			cjController.updateBoard(cjLogic.state);
			if (cjLogic.state.playerScore > 21) {
				cjLogic.state.update('Player Bust!');
				cjController.updateBoard(cjLogic.state);
				cjLogic.isPlayerRound = false;
				setTimeout(cjLogic.dealerRound, cjLogic.globalTimeout);
			}
		}
	},

	stand: function () {
		console.log('stand');
		if (cjLogic.isPlayerRound) { // Will disable button if it's not the playersround
			cjLogic.isPlayerRound = false;
			cjLogic.dealerRound();
		}
	},


};