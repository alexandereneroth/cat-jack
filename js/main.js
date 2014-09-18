'use strict';
var dealer = {};
/**
 **	@return The highest possible numerical value of the card (which is 11 for aces).
 **/
dealer.valueCard = function (card) {
	if (isNaN(Number(card[0]))) {
		if (card[0] === 'A') {
			return 11; // The card is an ace.
		}
		return 10; // The card is either a 10, a queen, a king, ...etc
	}
	return Number(card[0]);
};

var player = {};
player.name = '';
player.bank = 100;

player.hand = {};
player.hand.cards = [];
player.hand.aces = 0;
player.hand.value = 0;
player.hand.addCard = function (card) {
	this.cards.push(card);
	var cardValue = dealer.valueCard(card);
	this.value += cardValue;

	if (cardValue === 11) { // if the card that was added is an ace
		++this.aces;
	}
	if (this.value > 21) { // if the value of the hand is over 21
		if (this.aces > 0) { // and there are aces in the hand
			this.value -= 10; // change the value of an ace to 1
			--this.aces;
		}
	}
};

var playerCards = [];
var computerCards = [];
var cardDeck = [];
var GAME_OVER = false;

function createDeck(numberOfDecks) {
	var newDeck = [];
	for (var x = 0; x < numberOfDecks; x++) {
		newDeck.push('AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC');
		newDeck.push('AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH');
		newDeck.push('AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD');
		newDeck.push('AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS');
	}
	return newDeck;
}

function shuffle(array) {
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
}

function dealCardTo(player, numberOfCards) {
	for (var x = 0; x < numberOfCards; x++) {
		player.push(cardDeck.pop());
	}
}

function startGame() {

	// Ta fyra kortlekar och blanda dem
	cardDeck = createDeck(4);
	shuffle(cardDeck);

	// Huset och spelaren drar två kort
	dealCardTo(playerCards, 2);
	dealCardTo(computerCards, 2);

	// Visa ett av husets kort och alla spelarnas kort
	console.log('your cards: ' + playerCards[0] + ', ' + playerCards[1]);
	console.log('computers cards: ' + computerCards[0]);


}


function getValue(cards) {
	console.log(cards);
	var value = 0;
	var numAces = 0;

	// Check through cards and assign value
	for (var x = 0; x < cards.length; x++) {
		if (isNaN(Number(cards[x][0]))) { // Check for  A, K, Q, J or T
			if (cards[x][0] === 'A') { // If A..
				value += 11;
				++numAces;
			} else { // If K, Q, J or T
				value += 10;
			}
		} else { // If 1, 2, 3, 4, 5, 6, 7, 8, 9
			value += Number(cards[x][0]);
		}
	}

	// If we have any Aces count down their value from 11 to 1 if total value is over 21
	while (numAces !== 0 && value > 21) {
		console.log('Counting down aces');
		value -= 10;
		--numAces;
	}

	return value;
}

function getChoice() {
	var choice = prompt('a: Hit\nb: Stand').toLowerCase().trim();
	return choice;
}

function playRound() {
	var choice;
	var choiceIsValid = false;

	while (!choiceIsValid) {
		choice = getChoice();
		if (choice === 'a') {
			console.log('You have been hit');
			choiceIsValid = true;
			GAME_OVER = true;
		} else if (choice === 'b') {
			console.log('You have been stood up');
			choiceIsValid = true;
			GAME_OVER = true;
		}
	}
}

//________/ Start Game \___________
startGame();

while (!GAME_OVER) {
	if (getValue(playerCards) === 21) {
		console.log('Congratulations you have BlackJack!');
		GAME_OVER = true;
	}

	playRound();
}


// getCard() test
// while(playerTotalValue < 10000) {
// 	var x = getCard();
// 	if(x > 14) {
// 		console.log('x is too big');
// 	}
// 	playerTotalValue += x;
// 	console.log(getCard());