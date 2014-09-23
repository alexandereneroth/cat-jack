'use strict';

/********************
 * Global Variables *
 *******************/

// ***



/***********
 * Objects *
 **********/

// Game Object Constructor
var Game = function (dealerName, playerName) {
	this.name = 'Twenty One BlackJack';
	this.dealer = new Dealer(dealerName);
	this.player = new Player(playerName);
	this.gameOver = false;

	this.startGame = function () {
		this.dealer.prepareDeck();
		this.dealer.dealFirstHand(this.player);

	};

	this.playerRound = function () {
		var roundOver = false;
		var message = '';
		var focusMessage = '';
		var choice;

		// If round is not over
		while (!roundOver) {

			// Check if player is Bust or has BlackJack
			if (this.player.hand.totalValue === 21) {
				focusMessage = 'BlackJack!';
				roundOver = true;
			} else if (this.player.hand.totalValue > 21) {
				focusMessage = 'Bust!';
				roundOver = true;
			}

			message = this.getGameStatusMessage(focusMessage);
			focusMessage = '';

			// If this is not the last round
			if (!roundOver) { // Prompt the player and let him hit or stand
				choice = this.checkChoice(prompt(message + '\n\na: Hit\nb: Stand'));
				if (choice === 'hit') {
					this.dealer.dealCardTo(this.player.hand, 1);
				} else if (choice === 'stand') {
					roundOver = true;
				} else if (choice === 0) {
					focusMessage = 'Incorrect input!';
				}
			} else { // Else just display an alert with info
				alert(message);
			}
		}
	};


	// Creates and returns string with game status
	this.getGameStatusMessage = function (focusMessage) {
		var playerCards = '';
		var gameStatus = '';

		// Add the players card to playerCards
		for (var i = 0; i < this.player.hand.cards.length; i++) {
			playerCards += this.player.hand.cards[i] + ' | ';
		}

		// Add cards and special alert to message
		gameStatus += 'Your cards: | ' + playerCards + '\nValue: ' +
			this.player.hand.totalValue + '\n';
		gameStatus += 'Dealer cards: ' + this.dealer.hand.cards[0] + '\n\n';
		gameStatus += '- - - - - - - - - - - -' + '\n';
		gameStatus += '| ' + focusMessage + ' |' + '\n';
		gameStatus += '- - - - - - - - - - - -' + '\n';

		return gameStatus;
	};

	// Trims and checks user choice, returns 0 if choice is invalid
	this.checkChoice = function (choice) {
		var trimmedChoice = choice.toLowerCase().trim();
		if (trimmedChoice === 'a') {
			return 'hit';
		} else if (trimmedChoice === 'b') {
			return 'stand';
		} else {
			return 0;
		}
	};
};

// Dealer Object Constructor
var Dealer = function (name) {
	this.name = name;
	this.hand = new Hand(this);
	this.deck = [];

	this.getDeck = function (numberOfDecks) {
		var newDeck = [];
		for (var x = 0; x < numberOfDecks; x++) {
			newDeck.push('AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
				'JC', 'QC', 'KC');
			newDeck.push('AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
				'JH', 'QH', 'KH');
			newDeck.push('AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD',
				'JD', 'QD', 'KD');
			newDeck.push('AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
				'JS', 'QS', 'KS');
		}
		return newDeck;
	};

	this.shuffleDeck = function (array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	this.prepareDeck = function () {

		// Take four decks and shuffle them
		this.deck = this.getDeck(4);
		this.shuffleDeck(this.deck);
	};

	this.dealCardTo = function (hand, numberOfCards) {
		for (var x = 0; x < numberOfCards; x++) {
			hand.addCard(this.deck.pop());
		}
	};

	this.dealFirstHand = function (player) {

		// House and player gets two cards each.
		this.dealCardTo(player.hand, 2);
		this.dealCardTo(this.hand, 2);
	};
	// Draw cards until the outcome of BlackJack can be determined.
	this.drawAbove = function (playerHandValue) {
		if (this.hand.totalValue === 21 || playerHandValue === 0) { // playerHandValue === 0 happens if all players have busted
			return;
		}
		// If the player hand value is less than 17, try to draw above 17 anyway.
		if (playerHandValue < 17) {
			playerHandValue = 17;
		}
		// Draw cards until the player hand value had been matched or exceeded.
		while (this.hand.totalValue < playerHandValue) {
			if (this.hand.totalValue > 20) {
				return;
			}
			var drawnCard = this.deck.pop();
			console.log('The house drew ' + drawnCard);
			this.hand.addCard(drawnCard);
		}
	};
	this.getMostValuableHand = function (playerArray) {
		var mostValuableHand = 0;
		for (var i = 0; i < playerArray.length; i++) {
			var handValue = playerArray[i].hand.totalValue;
			if (handValue > mostValuableHand && handValue < 22) {
				mostValuableHand = handValue;
			}
		}
		return mostValuableHand;
	};
	this.declareWinner = function (playerArray) {
		// Determine the winner(s).
		var winningHandValue = 0;
		var winners = [];

		if (this.hand.totalValue < 22) {
			// initialized with the house as the winner.
			winningHandValue = this.hand.totalValue;
			winners = [this];
		}

		for (var i = 0; i < playerArray.length; i++) {
			var handValue = playerArray[i].hand.totalValue;
			if (handValue > winningHandValue && handValue < 22) {
				winningHandValue = handValue;
				winners = []; //empty the array
				winners.push(playerArray[i]);
			} else if (handValue === winningHandValue) {
				winners.push(playerArray[i]);
			}
		}
		// Print out the winner(s).
		var message = '';
		if (winners.length > 1) {
			message = 'The players: \n';
			for (var x = 0; x < winners.length; x++) {
				message = message + winners[x].name + '\n';
			}
			message = message + 'Tied, with a hand value of ' + winningHandValue + '!\n';
		} else {
			message = winners[0].name + ' won with ' + winningHandValue + '!';
		}
		console.log(message + '\n');
	};
};

// ***



// Hand Object Constructor 
var Hand = function () {
	this.cards = [];
	this.numberOfAces = 0;
	this.totalValue = 0;

	this.addCard = function (card) {
		var cardValue = this.getCardValue(card);
		this.cards.push(card);
		this.totalValue += cardValue;

		// if (cardValue === 11) { // if the card that was added is an ace
		// 	console.log('adding 11');
		// 	this.numberOfAces++;
		// }
		// if (this.totalValue > 21) { // if the value of the hand is over 21
		// 	if (this.numberOfAces > 0) { // and there are aces in the hand
		// 		this.totalValue -= 10; // change the value of an ace to 1
		// 		this.numberOfAces--;
		// 	}
		// }
	};

	this.getCardValue = function (card) {
		var cardValue = 0;
		if (isNaN(Number(card[0]))) {
			if (card[0] === 'A') { // The card is an A.
				cardValue = 11;
			} else { // The card is either a T, J, Q, K
				cardValue = 10;
			}
		} else { // If 1, 2, 3, 4, 5, 6, 7, 8, 9
			cardValue = Number(card[0]);
		}
		return cardValue;
	};
};

// Player Object Constructor
var Player = function (name) {
	this.name = name;
	this.bank = 100;
	this.hand = new Hand(this);
};

// ***



/**************
 * Start Game *
 *************/
var myGame = new Game('Joe the Dealer', 'Jitan');
myGame.startGame();
<<<<<<< HEAD
myGame.playerRound();
myGame.dealerRound();

// while (!myGame.gameOver) {
// 	// if (myGame.dealer.getCardValue(this.player.hand.cards) === 21) {
// 	// 	console.log('Congratulations you have BlackJack!');
// 	// 	GAME_OVER = true;
// 	// }
// 	myGame.playerRound();
// }
=======

while (!myGame.gameOver) {
	// if (myGame.dealer.getCardValue(this.player.hand.cards) === 21) {
	// 	console.log('Congratulations you have BlackJack!');
	// 	GAME_OVER = true;
	// }
	myGame.playRound();
}
var dealer = myGame.dealer;
dealer.drawAbove(dealer.getMostValuableHand([myGame.player])); // attempt to draw above the player with the most valuable hand.
dealer.declareWinner([myGame.player]);
>>>>>>> dealerDrawAbove
