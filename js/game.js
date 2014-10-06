/*globals game:true */

'use strict';
var game = {
	player: {},
	dealer: {},
	gameOver: false,
	isPlayerRound: true,
	playerAlert: '',
	dealerAlert: '',

	startGame: function () {
		// Reset game round variables
		game.isPlayerRound = true;

		// Main game function calls
		game.dealer.setNumberOfCardDecks(4);
		game.dealer.shuffleDeck();


		game.playerRound();
		game.dealerRound();

		// declareWinner takes a whole array so we can implement more
		// players in the future
		game.dealer.declareWinner([game.player]);
	},

	playerRound: function () {
		var roundOver = false;
		var message = '';
		var focusMessage = 'a) Hit    b) Stand';
		var choice;


		// Deal first hand 
		game.dealer.dealFirstHand(game.player);


		// If round is not over
		while (!roundOver) {

			// Check if player is Bust or has BlackJack
			var totValue = game.player.getHand().getTotalValue();
			if (totValue === 21) {
				focusMessage = 'CatJack!';
				game.playerAlert = ' - CatJack!';
				roundOver = true;
			} else if (totValue > 21) {
				focusMessage = 'Bust!';
				game.playerAlert = ' - Bust!';
				roundOver = true;
			}

			// If this is not the last round
			if (!roundOver) { // Prompt the player and let him hit or stand
				choice = game.checkChoice(prompt(message));
				if (choice === 'hit') {
					game.dealer.dealCardTo(game.player.getHand(), 1);
				} else if (choice === 'stand') {
					roundOver = true;
					game.playerAlert = ' - Stand';
				} else if (choice === 0) {
					focusMessage = 'Incorrect input!\na) Hit    b) Stand';
				} else if (choice === -1) {
					throw {
						name: 'Canceled game',
						message: 'User canceled game'
					};
				}
			} else { // Else just display an alert with info
				focusMessage = '';
				alert(message);
			}
		}
	},

	hit: function () {
		console.log('hit');
	},

	stand: function () {
		console.log('stand');
	},

	dealerRound: function () {
		game.isPlayerRound = false;
		game.dealer.playRound();
	},
};