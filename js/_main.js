'use strict';
(function () {

  window.onload = function () {
    var mainPin = document.querySelector('.map__pin--main');
    document.addEventListener('keydown', window.utils.isEscPressed);
    window.form.updateAddressInputValue(mainPin);
    window.form.toggleDisableForm();
    window.form.updatePriceInputPlaceholder();
    window.form.checkCapacity();
  };

  window.activatePage = function () {
    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    var mapFilters = document.querySelector('.map__filters');
    var mainPin = document.querySelector('.map__pin--main');

    var objects = window.createObjectArray(8);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    window.form.toggleDisableForm();
    window.form.updateAddressInputValue(mainPin);

    window.renderPins(objects);
    window.renderCard(objects[0]);

    window.removeMainPinEvents();
  };
})();
