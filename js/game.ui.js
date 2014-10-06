'use strict';

game.ui = (function () {
	var that = {
		makeCardImgTag: function (card) {
			var cardImg = document.createElement('img');
			cardImg.src = card.url;
			cardImg.style.height = '111px';
			return cardImg;
		},
		showCards: function (playerType, cardsToShow) {
			if (playerType === 'player' || playerType === 'dealer') {

				var cardElements = [];
				var cardImgTag;
				for (var i = 0; i < cardsToShow.length; i++) {
					cardImgTag = that.makeCardImgTag(cardsToShow[i]);
					cardElements.push(cardImgTag);
				}
				$('#player').append(cardElements);


			} else {
				throw 'playerType has to be either "computer" or "player"';
			}
		}
	};

	return that;
}());