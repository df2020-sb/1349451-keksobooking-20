'use strict';
(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinPosition = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  var removePinsAndCard = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('article.map__card');
    if (allPins.length > 0) {
      allPins.forEach(function (pin) {
        pin.remove();
      });
    }
    if (card) {
      card.remove();
    }

  };
  window.onload = function () {
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
  };

  window.activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
    window.form.updatePriceInputPlaceholder();
    window.form.checkCapacity();

    window.backend.load(window.utils.onLoadSuccess, window.utils.onError);

    window.mainPin.removeKeydownEvent();
  };

  window.disablePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    mainPin.style.left = mainPinPosition.x + 'px';
    mainPin.style.top = mainPinPosition.y + 'px';

    removePinsAndCard();

    window.form.reset();
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
  };
})();
