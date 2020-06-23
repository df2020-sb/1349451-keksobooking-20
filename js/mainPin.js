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

  var keyDownHandler = function (evt) {
    if (evt.keyCode === 13) {
      window.activatePage();
    }
  };

  var removeKeydownEvent = function () {
    mainPin.removeEventListener('keydown', keyDownHandler);
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0 && map.classList.contains('map--faded')) {
      window.activatePage();
    }
  };

  var mousedownHandler = function (evt) {
    if (!map.classList.contains('map--faded')) {
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

    var removeEvents = function (evt) {
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

  document.addEventListener('mousedown', mousedownHandler);
  document.addEventListener('keydown', keyDownHandler);

  mainPin.addEventListener('click', mainPinClickHandler);

  window.mainPin = {
    removeKeydownEvent: removeKeydownEvent,
    position: getPointerPosition,
  };

})();
