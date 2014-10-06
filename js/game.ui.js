'use strict';

game.ui = function () {
	var that = {
		makeCardImgTag: function (card) {
			var cardImg = document.createElement('img');
			cardImg.src = card.url;
			cardImg.style.height = '111px';
			return cardImg;
		}
	};

	return that;
};