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

	this.playRound = function () {

		// Hit or Stand
		var choice = this.getChoice(this.getGameStatus());

		if (choice === 'hit') {
			this.dealer.dealCardTo(this.player.hand, 1);

			if (this.player.hand.totalValue === 21) {
				console.log('Congratulations, you have BlackJack!');
				this.gameOver = true;
			} else if (this.player.hand.totalValue > 21) {
				console.log('You went over 21 and busted!');
				this.gameOver = true;
			}

		} else if (choice === 'stand') {
			this.gameOver = true;
		}
	};


	// Print all player cards and one dealer card
	this.getGameStatus = function () {
		var playerCards = '';
		var gameStatus = '';

		// Add the players card to playerCards
		for (var i = 0; i < this.player.hand.cards.length; i++) {
			playerCards += this.player.hand.cards[i] + ' ';
		}

		// Add cards to gameStatus
		gameStatus += 'Your cards: ' + playerCards + '\nValue: ' +
			this.player.hand.totalValue + '\n';
		gameStatus += 'Dealer cards: ' + this.dealer.hand.cards[0];

		return gameStatus;
	};


	this.getChoice = function (gameStatus) {
		var choice;
		var choiceMessage = gameStatus;
		choiceMessage += '\n\na: Hit\nb: Stand'; // Default message to get choice

		// Lets player choose to hit or stand
		for (;;) {
			choice = prompt(choiceMessage).toLowerCase().trim();
			if (choice === 'a') {
				return 'hit';
			} else if (choice === 'b') {
				return 'stand';
			}

			// If we get wrong input change message to let player know.
			choiceMessage += '\n\nIncorrect input!\nPlease enter \'a\' or \'b\'\n\n' +
				'a: Hit\nb: Stand';
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

while (!myGame.gameOver) {
	// if (myGame.dealer.getCardValue(this.player.hand.cards) === 21) {
	// 	console.log('Congratulations you have BlackJack!');
	// 	GAME_OVER = true;
	// }
	myGame.playRound();
}