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

    switch (true) {

      case price.value === 'any':
        return true;

      case price.value === 'middle' && (objectPrice > priceRange.MAX || objectPrice < priceRange.MIN):
        return false;

      case price.value === 'low' && objectPrice > priceRange.MIN:
        return false;

      case price.value === 'high' && objectPrice < priceRange.MAX:
        return false;
    }

    return true;
  };

  var checkFeatures = function (object) {
    for (var checkbox of checkboxes) {
      if (checkbox.checked && !object.offer.features.includes(checkbox.value)) {
        return false;
      }
    } return true;
  };


  var filterObjects = function (object) {

    switch (true) {
      case type.value !== 'any' && object.offer.type !== type.value:
        return false;

      case rooms.value !== 'any' && object.offer.rooms != rooms.value:
        return false;

      case guests.value !== 'any' && object.offer.guests != guests.value:
        return false;

      case !checkPrice(object) || !checkFeatures(object):
        return false;
    }

    return true;
  };

  var updatePins = window.utils.debounce(function () {
    window.pins.remove();
    window.card.remove();
    window.pins.render(window.objects.slice().filter(filterObjects));
  });

  filters.addEventListener('change', updatePins);

})();
