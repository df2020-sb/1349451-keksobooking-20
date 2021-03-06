'use strict';

(function () {

  var IMAGE_EXTENSIONS = ['gif', 'jpeg', 'jpg', 'png'];
  var MAX_ROOMS = 100;
  var MAX_PRICE = 1000000;

  var adForm = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var resetButton = document.querySelector('.ad-form__reset');

  var avatarPicker = document.querySelector('.ad-form__field input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarSource = avatarPreview.src;
  var photoPicker = document.querySelector('.ad-form__upload input');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoParent = document.querySelector('.ad-form__photo-container');

  var priceMap = {
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var checkCapacity = function () {
    var rooms = Number(roomNumberSelect.value);
    var capacity = Number(capacitySelect.value);
    var message = '';

    if (rooms === MAX_ROOMS && capacity !== 0) {
      message = 'Этот дом не для гостей';
    } else if (rooms !== MAX_ROOMS && capacity === 0) {
      message = 'Укажите количество гостей';
    } else if (capacity > rooms) {
      message = 'Слишком много гостей';
    }

    capacitySelect.setCustomValidity(message);
  };

  var checkPrice = function (type, price) {
    var message = '';

    if (!price) {
      message = 'Обязательное поле';
    } else if (price > MAX_PRICE) {
      message = 'Цена не может быть выше 1 000 000 ₽';
    } else if (price < priceMap[type]) {
      message = 'Цена не может быть ниже ' + priceMap[type] + ' ₽';
    }
    priceInput.setCustomValidity(message);
  };

  var updatePriceInputPlaceholder = function () {
    var type = typeSelect.value;
    priceInput.placeholder = priceMap[type] || 0;
  };

  var checkTimes = function (targetSelect, linkedSelect) {
    linkedSelect.value = targetSelect.value;
  };

  var updateAddressInputValue = function () {
    var position = window.mainPin.getPosition();
    document.querySelector('#address').value = position.x + ', ' + position.y;
  };

  var uploadImage = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var isValidExtension = IMAGE_EXTENSIONS.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (isValidExtension) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target === avatarPicker) {
          avatarPreview.src = reader.result;
        } else {
          var newPhoto = photoPreview.cloneNode(true);
          newPhoto.classList.add('new-photo');
          newPhoto.style.backgroundImage = 'url(' + reader.result + ')';
          photoParent.insertBefore(newPhoto, photoPreview);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var toggleDisableForm = function () {
    adForm.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  };

  var resetForm = function () {
    var newPhotos = document.getElementsByClassName('new-photo');
    while (newPhotos[0]) {
      photoParent.removeChild(newPhotos[0]);
    }
    avatarPreview.src = avatarSource;
    adForm.reset();
    updateAddressInputValue();
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    toggleDisableForm();
    updateAddressInputValue();
    updatePriceInputPlaceholder();
    checkCapacity();

  };

  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    toggleDisableForm();
    resetForm();
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.utils.onSaveSuccess, window.utils.onError);
  };

  titleInput.addEventListener('input', function () {
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

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    }
  });

  priceInput.addEventListener('input', function () {
    checkPrice(typeSelect.value, priceInput.value);
  });

  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    }
  });

  adForm.addEventListener('change', function (evt) {
    if (evt.target === capacitySelect || evt.target === roomNumberSelect) {
      checkCapacity();
    }

    if (evt.target === typeSelect) {
      updatePriceInputPlaceholder();
      checkPrice(typeSelect.value, priceInput.value);
    }

    if (evt.target === timeInSelect) {
      checkTimes(timeInSelect, timeOutSelect);
    }

    if (evt.target === timeOutSelect) {
      checkTimes(timeOutSelect, timeInSelect);
    }
  });

  avatarPicker.addEventListener('change', uploadImage);
  photoPicker.addEventListener('change', uploadImage);

  adForm.addEventListener('submit', onSubmit);

  resetButton.addEventListener('click', function () {
    window.main.disablePage();
  });

  window.form = {
    updateAddress: updateAddressInputValue,
    disable: disableForm,
    enable: enableForm
  };

})();
