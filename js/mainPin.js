'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');

  var mainPinMousedownHandler = function (evt) {
    if (evt.button === 0) {
      window.activatePage();
    }
  };

  var mainPinKeyDownHandler = function (evt) {
    if (evt.keyCode === 13) {
      window.activatePage();
    }
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  window.removeMainPinEvents = function () {
    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
  };
})();
