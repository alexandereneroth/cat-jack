'use strict';
var game = {
	player: {},
	dealer: {},
	gameOver: false,
	isPlayerRound: true,

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

		// Welcome Cat AlertBox
		alert(
			'         --------------------------------  \n' +
			'       (   Welcome to a new game of CatJack!   )\n' +
			'         -----\\      -----------------------\n' +
			'                    | /\n' +
			'                   /\n' +
			'   |\\___/|\n' +
			'   ) \u2ABD  \u2ABE   (\n' +
			'=\\  \u22bb     /=\n' +
			'    )----(\n' +
			'  /          \\\n' +
			'  |           |\n' +
			' /            \\\n' +
			' \\            /\n' +
			'  \\__     _/\n' +
			'      (  (\n' +
			'       )  )\n' +
			'      (_(');


		// Prepare player to start the game
		alert(game.getEmptyGameStatus('Press OK to start the game..'));

		// Deal first hand 
		game.dealer.dealFirstHand(game.player);


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

			// If this is not the last round
			if (!roundOver) { // Prompt the player and let him hit or stand
				choice = game.checkChoice(prompt(message));
				if (choice === 'hit') {
					game.dealer.dealCardTo(game.player.getHand(), 1);
				} else if (choice === 'stand') {
					roundOver = true;
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

	dealerRound: function () {
		game.isPlayerRound = false;
		game.dealer.playRound();
	},


	// Returns empty gameStatus string
	getEmptyGameStatus: function (focusMessage) {
		var gameStatus = '';

		// Create empty gameStatus
		gameStatus += game.dealer.getName() + '\'s hand:\n';
		gameStatus += '\n\n\n\n' + 'Value: 0\n\n';

		gameStatus += '\n';

		gameStatus += game.player.getName() + '\'s hand:\n';
		gameStatus += gameStatus += '\n\n\n\n' + 'Value: 0\n\n';

		gameStatus += '- - - - - - - - - - - - - - - - - -' + '\n';
		gameStatus += '\n';
		gameStatus += focusMessage + '\n';
		gameStatus += '\n';
		gameStatus += '- - - - - - - - - - - - - - - - - -' + '\n';

		return gameStatus;
	},


	// Creates and returns string with game status
	getGameStatusMessage: function (focusMessage) {
		var gameStatus = '';

		var dealerHand = game.dealer.getHand();

		// Initialized with what should be shown for the dealer when it is
		// the dealers round. (both cards, and full value)
		var dealerHandValue = dealerHand.getTotalValue();

		// If it is the players round, show one card backside up,
		// and only one cards value.
		if (game.isPlayerRound) {
			dealerHandValue = dealerHand.getCard(0).value;
		} else {
			dealerHandValue = dealerHand.getTotalValue();
		}

		// Add cards and special alert to message
		gameStatus += game.dealer.getName() + '\'s hand:\n';
		gameStatus += dealerHand.getCardString() + 'Value: ' +
			dealerHandValue + '\n\n';

		gameStatus += '\n';

		gameStatus += game.player.getName() + '\'s hand:\n';
		gameStatus += game.player.getHand().getCardString() + 'Value: ' +
			game.player.getHand().getTotalValue() + '\n\n';

		gameStatus += '- - - - - - - - - - - - - - - - - -' + '\n';
		gameStatus += '\n';
		gameStatus += focusMessage + '\n';
		gameStatus += '\n';
		gameStatus += '- - - - - - - - - - - - - - - - - -' + '\n';

		return gameStatus;
	},

	// Trims and checks user choice, returns 0 if choice is invalid
	// or -1 if user has canceled.
	checkChoice: function (choice) {
		if (choice !== null) {
			choice = choice.toLowerCase().trim();
		}

		if (choice === 'a') {
			return 'hit';
		} else if (choice === 'b') {
			return 'stand';
		} else if (choice === null) {
			return -1;
		} else {
			return 0;
		}
	}
};