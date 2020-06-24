'use strict';

(function () {

  var type = document.querySelector('#housing-type');

  var updatePins = function () {
    window.removePinsAndCard();
    window.pins.render(window.objects.slice().filter(function (object) {
      return type.value === 'any' ? true : object.offer.type === type.value;
    }));
  };

  type.addEventListener('change', updatePins);

})();
