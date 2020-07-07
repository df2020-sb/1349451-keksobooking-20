'use strict';

(function () {

  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinPosition = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    filters.classList.remove('hidden');
    window.form.enable();
    window.mainPin.removeKeydownEvent();
  };

  var disablePage = function () {
    mainPin.style.left = mainPinPosition.x + 'px';
    mainPin.style.top = mainPinPosition.y + 'px';
    map.classList.add('map--faded');
    filters.classList.add('hidden');
    filters.reset();
    window.pins.remove();
    window.card.remove();
    window.form.disable();
  };

  window.onload = function () {
    window.form.disable();
    filters.classList.add('hidden');
  };

  window.main = {
    activatePage: activatePage,
    disablePage: disablePage,
    ads: []
  };

})();
