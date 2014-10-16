/*globals game:true */

'use strict';
/**
 **	The Model that contains the game logic, and is decoupled from the view
 **	and controller.
 **/
game.m = {
	player: {},
	dealer: {},
	isPlayerTurn: true,
	globalTimeout: 1800,

	startGame: function () {

		// Main game function calls
		game.m.dealer.setNumberOfCardDecks(4);
		game.m.dealer.shuffleDeck();

		game.m.dealer.dealFirstHand(game.m.player);
	},

	hit: function () {
		console.log('hit');

		if (game.m.isPlayerTurn) {
			game.m.dealer.dealCardTo(game.m.player, 1);
			game.c.updateBoard(game.m.state);

			if (game.m.state.playerScore > 21) {
				game.m.state.update('Player Bust!');
				game.c.updateBoard(game.m.state);

				// Will disable button if it's not the players turn
				game.m.isPlayerTurn = false;

				game.m.dealer.playTurn();
			}
		}
	},

	stand: function () {
		console.log('stand');

		if (game.m.isPlayerTurn) {
			// Will disable button if it's not the players turn
			game.m.isPlayerTurn = false;

			game.m.dealer.playTurn();
		}
	},


};