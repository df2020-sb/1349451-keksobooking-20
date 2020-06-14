'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');

  var mousedownHandler = function (evt) {
    if (evt.button === 0) {
      window.activatePage();
    }
  };

  var keyDownHandler = function (evt) {
    if (evt.keyCode === 13) {
      window.activatePage();
    }
  };

  var removeEvents = function () {
    mainPin.removeEventListener('mousedown', mousedownHandler);
    mainPin.removeEventListener('keydown', keyDownHandler);
  };

  mainPin.addEventListener('mousedown', mousedownHandler);
  mainPin.addEventListener('keydown', keyDownHandler);

  window.mainPin = {
    removeEvents: removeEvents,
  };

})();
