'use strict';
var game = {
	player: {},
	dealer: {},
	name: 'Twenty One BlackJack',
	gameOver: false,
	isDealerRound: false,
	isFirstRound: true,

	startGame: function () {
		// Reset game round variables
		game.isDealerRound = false;
		game.isFirstRound = true;

		// Main game function calls
		game.dealer.prepareDeck();
		game.dealer.dealFirstHand(game.player);
		game.playerRound();
		game.dealerRound();
		game.dealer.declareWinner([game.player]);
	},

	playerRound: function () {
		var isFirstRound = true;
		var roundOver = false;
		var message = '';
		var focusMessage = 'Welcome to a new game of Twenty One BlackJack!';
		var choice;

		// If round is not over
		while (!roundOver) {
			if (isFirstRound) {

			}

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
		game.isDealerRound = true;
		game.dealer.playRound();
	},

	// Creates and returns string with game status
	getGameStatusMessage: function (focusMessage) {
		var gameStatus = '';
		var dealerHandString = '';
		var dealerHand = game.dealer.getHand();
		var totalValue = '';

		// If it is the dealer round show all cards
		if (game.isDealerRound) {
			dealerHandString = dealerHand.getCardString();
			totalValue = dealerHand.getTotalValue();
		} else { // otherwise only the first one
			dealerHandString = dealerHand.getCards()[0];
			totalValue = dealerHand.getCardValue(dealerHand.getCards()[0]);
		}
		// Add cards and special alert to message
		gameStatus += game.dealer.getName() + '\'s hand:\n';
		gameStatus += dealerHandString + '\nValue: ' +
			totalValue + '\n\n';

		gameStatus += '\n';

		gameStatus += game.player.getName() + '\'s hand:\n';
		gameStatus += game.player.getHand().getCardString() + '\nValue: ' +
			game.player.getHand().getTotalValue() + '\n\n';

		gameStatus += '- - - - - - - - - - - - - - - - - -' + '\n';
		gameStatus += '\n';
		gameStatus += focusMessage + '\n';
		gameStatus += '\n';
		gameStatus += '- - - - - - - - - - - - - - - - - -' + '\n';

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