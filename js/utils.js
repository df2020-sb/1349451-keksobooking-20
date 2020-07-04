'use strict';

(function () {

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

  var onLoadSuccess = function (objects) {
    window.main.objects = objects;
    window.pins.render(window.main.objects);
    window.main.activatePage();
  };

  var onSaveSuccess = function () {
    window.main.disablePage();
    window.banner.render('success');
  };

  var onError = function (type, errorMessage) {
    window.banner.render('error', type, errorMessage);
  };

  var debounce = function (callback) {
    var timeout = null;

    return function () {
      var parameters = arguments;

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        callback.apply(null, parameters);
      }, 500);
    };
  };

  window.utils = {
    getNounCase: getNounCase,
    isEscPressed: isEscPressed,
    isClicked: isClicked,
    onLoadSuccess: onLoadSuccess,
    onSaveSuccess: onSaveSuccess,
    onError: onError,
    debounce: debounce,
  };

})();
