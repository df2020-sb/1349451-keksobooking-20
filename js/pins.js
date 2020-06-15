'use strict';
(function () {

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
    objects.forEach(function (a) {
      fragment.appendChild(renderPin(a));
    });
    pinContainer.appendChild(fragment);
    fragment.innerHTML = '';
  };

  var getPosition = function (pin) {
    var x = Math.trunc(pin.offsetLeft + pin.offsetWidth / 2);
    var y = Math.trunc(pin.offsetTop + pin.offsetHeight);
    return { x, y };
  };

  window.pins = {
    render: renderPins,
    position: getPosition,
  };

})();
