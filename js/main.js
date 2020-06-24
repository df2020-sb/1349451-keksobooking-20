'use strict';
(function () {

  window.objects = [];

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinPosition = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  window.onload = function () {
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
    mapFilters.classList.add('hidden');
  };

  window.activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('hidden');
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
    window.form.updatePriceInputPlaceholder();
    window.form.checkCapacity();

    window.mainPin.removeKeydownEvent();
  };

  window.disablePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('hidden');
    mainPin.style.left = mainPinPosition.x + 'px';
    mainPin.style.top = mainPinPosition.y + 'px';

    window.pins.remove();
    window.card.remove();

    window.form.reset();
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
  };

})();
