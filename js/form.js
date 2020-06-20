'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

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


  var reset = function (evt) {
    adForm.reset();
    updateAddressInputValue();
  };

  var checkTimes = function (target) {
    target === timeInSelect
      ? timeOutSelect.value = timeInSelect.value
      : timeInSelect.value = timeOutSelect.value;
  };

  var updateAddressInputValue = function () {
    var x = window.mainPin.position().x;
    var y = window.mainPin.position().y;
    document.querySelector('#address').value = x + ', ' + y;
  };

  var toggleDisableForm = function () {
    adForm.querySelectorAll('fieldset').forEach(function (a) {
      a.disabled = !a.disabled;
    });
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.utils.onSaveSuccess, window.utils.onError);
  };


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

  adForm.addEventListener('submit', onSubmit);
  document.querySelector('.ad-form__reset').addEventListener('click', reset);

  window.form = {
    checkCapacity: checkCapacity,
    updatePriceInputPlaceholder: updatePriceInputPlaceholder,
    toggleDisableForm: toggleDisableForm,
    updateAddressInputValue: updateAddressInputValue,
    onSubmit: onSubmit,
    reset: reset,
  };

})();
