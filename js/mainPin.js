'use strict';
(function () {

  var WIDTH = 62;
  var FULL_HEIGHT = 77;
  var IMAGE_HEIGHT = 62;
  var IMAGE_TRANSLATE_Y = -7;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var minX = -WIDTH / 2;
  var maxX = minX + map.offsetWidth;

  var getPointerPosition = function () {
    var x = Math.trunc(mainPin.offsetLeft + WIDTH / 2);
    var y = Math.trunc(mainPin.offsetTop + IMAGE_TRANSLATE_Y + IMAGE_HEIGHT / 2);
    if (!map.classList.contains('map--faded')) {
      y = Math.trunc(mainPin.offsetTop + FULL_HEIGHT);
    }
    return { x, y };
  };

  var onDocumentKeyDown = function (evt) {
    if (evt.keyCode === 13) {
      window.backend.load(window.utils.onLoadSuccess, window.utils.onError);
    }
  };

  var removeKeydownEvent = function () {
    mainPin.removeEventListener('keydown', onDocumentKeyDown);
  };

  var onMainPinClick = function (evt) {
    if (evt.button === 0 && map.classList.contains('map--faded')) {
      window.backend.load(window.utils.onLoadSuccess, window.utils.onError);
    }
  };

  var onDocumentMouseDown = function (evt) {
    if (!map.classList.contains('map--faded') && evt.target.parentNode === mainPin) {
      dragMainPin(evt);
    }
  };


  // Drag

  var dragMainPin = function (evt) {
    var cursor = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      updatePosition(moveEvt);
      cursor = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    var onMouseUp = function (upEvt) {
      updatePosition(upEvt);
      removeEvents();
    };

    var removeEvents = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var updatePosition = function (evt) {
      var newX = mainPin.offsetLeft - (cursor.x - evt.clientX);
      var newY = mainPin.offsetTop - (cursor.y - evt.clientY);
      mainPin.style.left = Math.max(minX, Math.min(newX, maxX)) + 'px';
      mainPin.style.top = Math.max(MIN_Y - FULL_HEIGHT, Math.min(newY, MAX_Y - FULL_HEIGHT)) + 'px';
      window.form.updateAddressInputValue();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousedown', onDocumentMouseDown);
  document.addEventListener('keydown', onDocumentKeyDown);

  mainPin.addEventListener('click', onMainPinClick);

  window.mainPin = {
    removeKeydownEvent: removeKeydownEvent,
    position: getPointerPosition,
  };

})();
