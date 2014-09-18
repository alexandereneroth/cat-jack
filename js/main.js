'use strict';
var playerCards = [];
var computerCards = [];
var cardDeck = [];
var GAME_OVER = false;

function createDeck(numberOfDecks) {
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

function getValue(cards) {
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
		value -= 10;
		--numAces;
	}

	return value;
}

function dealCardTo(player, numberOfCards) {
	for (var x = 0; x < numberOfCards; x++) {
		player.push(cardDeck.pop());
	}
}

function prepareDeck() {

	// Ta fyra kortlekar och blanda dem
	cardDeck = createDeck(4);
	shuffle(cardDeck);
}

function dealBeginningHand() {

	// Huset och spelaren drar två kort
	dealCardTo(playerCards, 2);
	dealCardTo(computerCards, 2);
}


// Print all player cards and one dealer card
function printHands() {
	var printMessage = '';

	// Add the players card to printMessage
	for (var i = 0; i < playerCards.length; i++) {
		printMessage += playerCards[i] + ' ';
	}

	// Skriv ut korten
	console.log('your cards: ' + printMessage + '\n Total value: ' +
		getValue(playerCards));
	console.log('computers cards: ' + computerCards[0]);
}


function getChoice() {
	var choice;
	var choiceMessage = 'a: Hit\nb: Stand'; // Default message to get choice

	// Lets player choose to hit or stand
	for (;;) {
		choice = prompt(choiceMessage).toLowerCase().trim();
		if (choice === 'a') {
			console.log('You have been hit');
			return 'hit';
		} else if (choice === 'b') {
			console.log('You have been stood up');
			return 'stand';
		}

		// If we get wrong input change message to let player know.
		choiceMessage = 'Incorrect input!\nPlease enter \'a\' or \'b\'\n\n' +
			'a: Hit\nb: Stand';
	}
}



function playRound() {

	// Hit or Stand
	var choice = getChoice();

	if (choice === 'hit') {
		dealCardTo(playerCards, 1);
		printHands();
	} else if (choice === 'stand') {
		GAME_OVER = true;
	}
}



//________/ Start Game \___________
prepareDeck();
dealBeginningHand();
printHands();

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