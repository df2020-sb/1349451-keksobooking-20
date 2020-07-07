'use strict';

(function () {

  var TIMEOUT = 500;
  var ESCAPE_KEYCODE = 27;

  var getNounCase = function (number, array) {

    if (number % 10 === 1 && number !== 11) {
      return array[0];
    } else if ((number % 10 === 2 && number !== 12) || (number % 10 === 3 && number !== 13) || (number % 10 === 4 && number !== 14)) {
      return array[1];
    } else {
      return array[2] || array[1];
    }
  };

  var isEscPressed = function (evt) {
    var banner = document.querySelector('.banner');
    var card = document.querySelector('.map__card');
    if (evt.keyCode === ESCAPE_KEYCODE && banner) {
      window.banner.remove();
    }
    if (evt.keyCode === ESCAPE_KEYCODE && card) {
      card.classList.add('hidden');
    }
  };

  var isClicked = function (evt) {
    var errorButton = document.querySelector('.error__button');
    if (evt.target !== errorButton) {
      window.banner.remove();
    }
  };

  var onLoadSuccess = function (data) {
    window.main.ads = data;
    window.pins.render(window.main.ads);
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
      }, TIMEOUT);
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
