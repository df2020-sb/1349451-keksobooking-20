'use strict';
(function () {

  window.onload = function () {
    var mainPin = document.querySelector('.map__pin--main');
    document.addEventListener('keydown', window.utils.isEscPressed);
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue(mainPin);
  };

  window.activatePage = function () {
    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    var mapFilters = document.querySelector('.map__filters');
    var mainPin = document.querySelector('.map__pin--main');

    var objects = window.data.createObjects(8);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    window.form.toggleDisableForm();
    window.form.updateAddressInputValue(mainPin);
    window.form.updatePriceInputPlaceholder();
    window.form.checkCapacity();

    window.pins.render(objects);
    window.card.render(objects[0]);

    window.mainPin.removeEvents();
  };
})();
