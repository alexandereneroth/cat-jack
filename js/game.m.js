/*globals game:true */

'use strict';
/**
 **	The Model that contains the game logic, and is decoupled from the view
 **	and controller.
 **/
game.m = {
	player: {},
	dealer: {},
	isPlayerRound: true,
	globalTimeout: 1800,

	startGame: function () {

		// Main game function calls
		game.m.dealer.setNumberOfCardDecks(4);
		game.m.dealer.shuffleDeck();

		game.m.dealer.dealFirstHand(game.m.player);
	},

	playerRound: function () {},

	dealerRound: function () {
		game.m.dealer.playRound();
	},

	hit: function () {
		console.log('hit');
		if (game.m.isPlayerRound) { // Will disable button if it's not the playersround
			game.m.dealer.dealCardTo(game.m.player, 1);
			game.c.updateBoard(game.m.state);
			if (game.m.state.playerScore > 21) {
				game.m.state.update('Player Bust!');
				game.c.updateBoard(game.m.state);
				game.m.isPlayerRound = false;
				setTimeout(game.m.dealerRound, game.m.globalTimeout);
			}
		}
	},

	stand: function () {
		console.log('stand');
		if (game.m.isPlayerRound) { // Will disable button if it's not the playersround
			game.m.isPlayerRound = false;
			game.m.dealerRound();
		}
	},


};