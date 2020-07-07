'use strict';

(function () {

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
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
    var selectedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
    return selectedFeatures.every(function (checkbox) {
      return (features.indexOf(checkbox.value) >= 0);
    });
  };

  var filterAds = function (ad) {

    return (typeSelect.value === 'any' || ad.offer.type === typeSelect.value) &&
      (roomsSelect.value === 'any' || ad.offer.rooms === Number(roomsSelect.value)) &&
      (guestsSelect.value === 'any' || ad.offer.guests === Number(guestsSelect.value)) &&
      checkPrice(ad.offer.price) &&
      checkFeatures(ad.offer.features);
  };

  var updatePins = window.utils.debounce(function () {
    window.pins.remove();
    window.card.remove();
    window.pins.render(window.main.ads.slice().filter(filterAds));
  });

  filters.addEventListener('change', updatePins);

})();
