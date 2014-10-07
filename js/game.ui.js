'use strict';

game.ui = (function () {
	var that = {
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
		}
	};

	return that;
}());