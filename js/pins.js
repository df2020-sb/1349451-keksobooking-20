'use strict';
(function () {

  var MAX_PINS_NUMBER = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var renderPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = object.location.x + pinElement.offsetWidth / 2 + 'px';
    pinElement.style.top = object.location.y + pinElement.offsetHeight + 'px';
    pinImage.src = object.author.avatar;
    pinImage.alt = object.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.render(object);
    });
    return pinElement;
  };

  var renderPins = function (objects) {
    objects.slice(0, MAX_PINS_NUMBER).forEach(function (object) {
      fragment.appendChild(renderPin(object));
    });
    pinContainer.appendChild(fragment);
    fragment.innerHTML = '';
  };

  var removePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
  };

})();
