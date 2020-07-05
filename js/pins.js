'use strict';
(function () {

  var MAX_PINS_NUMBER = 5;

  var activePin;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = ad.location.x + pinElement.offsetWidth / 2 + 'px';
    pinElement.style.top = ad.location.y + pinElement.offsetHeight + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    var onPinClick = function (evt) {
      if (activePin === evt.target) {
        return;
      }
      activePin = evt.target;
      window.card.render(ad);
    };

    pinElement.addEventListener('click', onPinClick);
    return pinElement;
  };

  var renderPins = function (ads) {
    ads.slice(0, MAX_PINS_NUMBER).forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
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
