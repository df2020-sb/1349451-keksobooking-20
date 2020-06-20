'use strict';
(function () {

  window.onload = function () {
    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
  };

  window.activatePage = function () {

    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    var mapFilters = document.querySelector('.map__filters');

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    window.form.toggleDisableForm();
    window.form.updateAddressInputValue();
    window.form.updatePriceInputPlaceholder();
    window.form.checkCapacity();

    window.backend.load(window.backend.onLoadSuccess, window.backend.onError);

    window.mainPin.removeKeydownEvent();
  };

})();
