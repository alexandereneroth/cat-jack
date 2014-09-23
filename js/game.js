'use strict';
var game = {
	player: {},
	dealer: {},
	name: 'Twenty One BlackJack',
	gameOver: false,

	startGame: function () {
		game.dealer.prepareDeck();
		game.dealer.dealFirstHand(game.player);
	},

	playerRound: function () {
		var roundOver = false;
		var message = '';
		var focusMessage = '';
		var choice;

		// If round is not over
		while (!roundOver) {

			// Check if player is Bust or has BlackJack
			var totValue = game.player.getHand().getTotalValue();
			if (totValue === 21) {
				focusMessage = 'BlackJack!';
				roundOver = true;
			} else if (totValue > 21) {
				focusMessage = 'Bust!';
				roundOver = true;
			}

			message = game.getGameStatusMessage(focusMessage);
			focusMessage = '';

			// If this is not the last round
			if (!roundOver) { // Prompt the player and let him hit or stand
				choice = game.checkChoice(prompt(message + '\n\na: Hit\nb: Stand'));
				if (choice === 'hit') {
					game.dealer.dealCardTo(game.player.getHand(), 1);
				} else if (choice === 'stand') {
					roundOver = true;
				} else if (choice === 0) {
					focusMessage = 'Incorrect input!';
				}
			} else { // Else just display an alert with info
				alert(message);
			}
		}
	},

	dealerRound: function () {
		// attempt to draw above the player with the most valuable hand.
		game.dealer.drawAbove(game.dealer.getMostValuableHand([game.player]));
		game.dealer.declareWinner([game.player]);
	},

	// Creates and returns string with game status
	getGameStatusMessage: function (focusMessage) {
		var playerCards = '';
		// var dealerCards = '';
		var gameStatus = '';

		// Add the players card to playerCards
		for (var i = 0; i < game.player.getHand().getCards().length; i++) {
			playerCards += game.player.getHand().getCards()[i] + ' | ';
		}

		// Add cards and special alert to message
		gameStatus += 'Your cards: | ' + playerCards + '\nValue: ' +
			game.player.getHand().getTotalValue() + '\n';
		gameStatus += 'Dealer cards: ' + game.dealer.getHand().getCards()[0] + '\n\n';
		gameStatus += '- - - - - - - - - - - -' + '\n';
		gameStatus += '| ' + focusMessage + ' |' + '\n';
		gameStatus += '- - - - - - - - - - - -' + '\n';

		return gameStatus;
	},

	// Trims and checks user choice, returns 0 if choice is invalid
	checkChoice: function (choice) {
		var trimmedChoice = choice.toLowerCase().trim();
		if (trimmedChoice === 'a') {
			return 'hit';
		} else if (trimmedChoice === 'b') {
			return 'stand';
		} else {
			return 0;
		}
	}
};