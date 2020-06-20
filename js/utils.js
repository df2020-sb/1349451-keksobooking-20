'use strict';

(function () {

  var getRandomRangeNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayElements = function (arr) {
    var res = [];
    var len = getRandomRangeNumber(1, arr.length);
    while (res.length < len) {
      var randomIndex = getRandomRangeNumber(0, arr.length - 1);
      if (res.indexOf(randomIndex) === -1) {
        res.push(randomIndex);
      }
    }
    return res.sort(function (a, b) { return a - b; }).map(function (a) { return arr[a]; });
  };

  var getNounCase = function (number, array) {
    return (
      number % 10 === 1 && number !== 11
        ? array[0]
        : (number % 10 === 2 && number !== 12) || (number % 10 === 3 && number !== 13) || (number % 10 === 4 && number !== 14)
          ? array[1]
          : array[2] || array[1]);
  };

  var isEscPressed = function (evt) {
    var banner = document.querySelector('.banner');
    var card = document.querySelector('.map__card');
    if (evt.keyCode === 27 && banner) {
      window.banner.remove();
    }
    if (evt.keyCode === 27 && card) {
      card.classList.add('hidden');
    }
  };

  var isClicked = function (evt) {
    var errorButton = document.querySelector('.error__button');
    if (evt.target !== errorButton) {
      window.banner.remove();
    }
  };

  window.utils = {
    getRandomRangeNumber: getRandomRangeNumber,
    getRandomArrayElements: getRandomArrayElements,
    getNounCase: getNounCase,
    isEscPressed: isEscPressed,
    isClicked: isClicked,
  };

})();
