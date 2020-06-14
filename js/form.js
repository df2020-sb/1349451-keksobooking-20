'use strict';
(function () {


  var MAIN_PIN_POINTER_HEIGHT = 22;
  var MAIN_PIN_IMAGE_TRANSLATE_Y = -7;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinImage = mainPin.querySelector('img');

  var adForm = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');


  // Проверки

  var checkCapacity = function () {
    var message = '';
    var rooms = parseInt(roomNumberSelect.value);
    var capacity = parseInt(capacitySelect.value);

    switch (true) {
      case rooms === 100 && capacity !== 0:
        message = 'Этот дом не для гостей';
        break;
      case rooms !== 100 && capacity === 0:
        message = 'Укажите количество гостей';
        break;
      case capacity > rooms:
        message = 'Слишком много гостей';
        break;
    }
    capacitySelect.setCustomValidity(message);
  };

  var checkPrice = function (type, price) {
    var message = '';

    if (!price) {
      message = 'Обязательное поле';
    } else if (price > 1000000) {
      message = 'Цена не может быть выше 1 000 000 ₽';
    }

    switch (true) {
      case (type === 'flat' && price < 1000):
        message = 'Цена не может быть ниже 1 000 ₽';
        break;
      case (type === 'house' && price < 5000):
        message = 'Цена не может быть ниже 5 000 ₽';
        break;
      case (type === 'palace' && price < 10000):
        message = 'Цена не может быть ниже 10 000 ₽';
        break;
    }
    priceInput.setCustomValidity(message);
  };

  var updatePriceInputPlaceholder = function () {
    var type = typeSelect.value;
    var placeholder = 0;

    switch (type) {
      case 'flat':
        placeholder = '1000';
        break;
      case 'house':
        placeholder = '5000';
        break;
      case 'palace':
        placeholder = '10000';
        break;
    }
    priceInput.placeholder = placeholder;
  };

  var checkTimes = function (target) {
    target === timeInSelect
      ? timeOutSelect.value = timeInSelect.value
      : timeInSelect.value = timeOutSelect.value;
  };


  // События

  titleInput.addEventListener('input', function (evt) {
    var message = '';

    if (titleInput.validity.tooShort) {
      message = 'Заголовок должен быть не менее 30 символов.';
    } else if (titleInput.validity.tooLong) {
      message = 'Заголовок должен быть не более 100 символов.';
    } else if (titleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    }
    titleInput.setCustomValidity(message);
  });

  titleInput.addEventListener('invalid', function (evt) {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    }
  });

  priceInput.addEventListener('input', function (evt) {
    checkPrice(typeSelect.value, priceInput.value);
  });

  priceInput.addEventListener('invalid', function (evt) {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    }
  });

  adForm.addEventListener('change', function (evt) {
    if (evt.target === capacitySelect || evt.target === roomNumberSelect) {
      checkCapacity(roomNumberSelect.value, capacitySelect.value);
    }

    if (evt.target === typeSelect) {
      updatePriceInputPlaceholder(typeSelect.value);
      checkPrice(typeSelect.value, priceInput.value);
    }

    if (evt.target === timeInSelect || evt.target === timeOutSelect) {
      checkTimes(evt.target);
    }
  });

  var updateAddressInputValue = function (pin) {
    var pinX = Math.trunc(pin.offsetLeft + pin.offsetWidth / 2);
    var pinY = Math.trunc(pin.offsetTop + pin.offsetHeight);

    if (!map.classList.contains('map--faded') && pin === mainPin) {
      pinY = Math.trunc(mainPin.offsetTop + MAIN_PIN_IMAGE_TRANSLATE_Y + mainPinImage.offsetHeight + MAIN_PIN_POINTER_HEIGHT);
    } else if (map.classList.contains('map--faded')) {
      pinY = Math.trunc(mainPin.offsetTop + MAIN_PIN_IMAGE_TRANSLATE_Y + mainPinImage.offsetHeight / 2);
    }
    document.querySelector('#address').value = pinX + ', ' + pinY;
  };

  var toggleDisableForm = function () {
    adForm.querySelectorAll('fieldset').forEach(function (a) {
      a.disabled = !a.disabled;
    });
  };

  window.form = {
    checkCapacity: checkCapacity,
    updatePriceInputPlaceholder: updatePriceInputPlaceholder,
    toggleDisableForm: toggleDisableForm,
    updateAddressInputValue: updateAddressInputValue,
  };

})();
