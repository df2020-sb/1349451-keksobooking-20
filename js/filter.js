'use strict';

(function () {

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var checkboxes = document.querySelectorAll('.map__checkbox');
  var filters = document.querySelector('.map__filters');

  var priceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var checkPrice = function (price) {
    return priceSelect.value === 'any' ||
      (priceSelect.value === 'middle' && (price > priceRange.MAX || price < priceRange.MIN)) ||
      (priceSelect.value === 'low' && price > priceRange.MIN) ||
      (priceSelect.value === 'high' && price < priceRange.MAX);
  };

  var checkFeatures = function (features) {
    for (var checkbox of checkboxes) {
      if (checkbox.checked && !features.includes(checkbox.value)) {
        return false;
      }
    }

    return true;
  };

  var filterObjects = function (object) {
    return (typeSelect.value === 'any' || object.offer.type === typeSelect.value) &&
      (roomsSelect.value === 'any' || object.offer.rooms === Number(roomsSelect.value)) &&
      (guestsSelect.value === 'any' || object.offer.guests === Number(guestsSelect.value)) &&
      checkPrice(object.offer.price) &&
      checkFeatures(object.offer.features);
  };

  var updatePins = window.utils.debounce(function () {
    window.pins.remove();
    window.card.remove();
    window.pins.render(window.objects.slice().filter(filterObjects));
  });

  filters.addEventListener('change', updatePins);

})();
