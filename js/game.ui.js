'use strict';

game.ui = (function () {
	var that = {
		updateBoard: function (gs) {
			showMessage(gs.focusMessage);
			showScore(gs.dealerScore, gs.playerScore);
			// TODO: Implement showCards
			// Suggestion: have it take the gs.playerCards and gs.dealerCards array
			// and update them both, no need to check who is being updated.
		},
		// TODO: implement updateAlerts()
		// Suggestion: have it take gs.dealerAlert and gs.playerAlert and update the alertBoxes
		// in html. OBS. They have not been added yet so you need to do this as well. I suggest
		// we put them next to the score like before.

		makeCardImgTag: function (card) {
			var cardImg = document.createElement('img');
			cardImg.src = card.url;
			cardImg.style.height = '100px';
			return cardImg;
		},
		showMessage: function (message) {
			$('#message-area p').text(message);
		},
		showCards: function (playerType, cardsToShow) {
			if (playerType === 'player' || playerType === 'dealer') {

				var cardElements = [];
				var cardImgTag;
				for (var i = 0; i < cardsToShow.length; i++) {
					cardImgTag = that.makeCardImgTag(cardsToShow[i]);
					cardElements.push(cardImgTag);
				}
				if (playerType === 'player') {
					$('#player').empty();
					$('#player').append(cardElements);
				} else {
					$('#dealer').empty();
					$('#dealer').append(cardElements);
				}


			} else {
				throw 'playerType has to be either "dealer" or "player"';
			}
		},
		showScore: function (dealerScore, playerScore) {
			$('#dealer-score').text(dealerScore);
			$('#player-score').text(playerScore);
		}
	};

	return that;
}());