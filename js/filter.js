'use strict';

(function () {

  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  var checkboxes = document.querySelectorAll('.map__checkbox');
  var filters = document.querySelector('.map__filters');

  var priceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var checkPrice = function (object) {
    var objectPrice = object.offer.price;
    return price.value === 'any' ||
      (price.value === 'middle' && (objectPrice > priceRange.MAX || objectPrice < priceRange.MIN)) ||
      (price.value === 'low' && objectPrice > priceRange.MIN) ||
      (price.value === 'high' && objectPrice < priceRange.MAX);
  };

  var checkFeatures = function (object) {
    for (var checkbox of checkboxes) {
      if (checkbox.checked && !object.offer.features.includes(checkbox.value)) {
        return false;
      }
    } return true;
  };

  var filterObjects = function (object) {
    return (type.value === 'any' || object.offer.type === type.value) &&
      (rooms.value === 'any' || object.offer.rooms == rooms.value) &&
      (guests.value === 'any' || object.offer.guests != guests.value) &&
      checkPrice(object) &&
      checkFeatures(object);
  };

  var updatePins = window.utils.debounce(function () {
    window.pins.remove();
    window.card.remove();
    window.pins.render(window.objects.slice().filter(filterObjects));
  });

  filters.addEventListener('change', updatePins);

})();
