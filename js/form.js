'use strict';
(function () {

  var IMAGE_EXTENSIONS = ['gif', 'jpeg', 'jpg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  var avatarPicker = document.querySelector('.ad-form__field input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarSource = avatarPreview.src;
  var photoPicker = document.querySelector('.ad-form__upload input');
  var photoPreview = document.querySelector('.ad-form__photo');

  avatarPreview.style.height = '100%';
  avatarPreview.style.width = 'auto';
  avatarPreview.parentNode.style.padding = '0';
  photoPreview.style.backgroundRepeat = "no-repeat";
  photoPreview.style.backgroundSize = "cover";

  var priceMap = new Map([
    ['flat', 1000],
    ['house', 5000],
    ['palace', 10000],
  ]);

  var checkCapacity = function () {
    var rooms = parseInt(roomNumberSelect.value);
    var capacity = parseInt(capacitySelect.value);

    var message = rooms === 100 && capacity !== 0
      ? 'Этот дом не для гостей'
      : rooms !== 100 && capacity === 0
        ? 'Укажите количество гостей'
        : capacity > rooms
          ? 'Слишком много гостей'
          : '';

    capacitySelect.setCustomValidity(message);
  };

  var checkPrice = function (type, price) {
    var message = 'Цена не может быть ниже ';

    message = (!price)
      ? 'Обязательное поле'
      : price > 1000000
        ? 'Цена не может быть выше 1 000 000 ₽'
        : price < priceMap.get(type)
          ? message + priceMap.get(type) + ' ₽'
          : '';

    priceInput.setCustomValidity(message);
  };

  var updatePriceInputPlaceholder = function () {
    var type = typeSelect.value;
    priceInput.placeholder = priceMap.get(type) || 0;
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

  var uploadImage = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var isValidExtension = IMAGE_EXTENSIONS.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (isValidExtension) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        evt.target === avatarPicker
          ? avatarPreview.src = reader.result
          : photoPreview.style.backgroundImage = "url(" + reader.result + ")";
      });
      reader.readAsDataURL(file);
    }
  };

  var toggleDisableForm = function () {
    adForm.querySelectorAll('fieldset').forEach(function (a) {
      a.disabled = !a.disabled;
    });
  };

  var resetForm = function () {
    adForm.reset();
    updateAddressInputValue();
    avatarPreview.src = avatarSource;
    photoPreview.style.backgroundImage = 'none';
  };

  var enableForm = function () {
    toggleDisableForm();
    updateAddressInputValue();
    updatePriceInputPlaceholder();
    checkCapacity();
  };

  var disableForm = function () {
    toggleDisableForm();
    resetForm();
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.utils.onSaveSuccess, window.utils.onError);
  };

  titleInput.addEventListener('input', function () {

    var message = titleInput.validity.tooShort
      ? 'Заголовок должен быть не менее 30 символов.'
      : titleInput.validity.tooLong
        ? 'Заголовок должен быть не более 100 символов.'
        : titleInput.validity.valueMissing
          ? 'Обязательное поле'
          : '';

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

    if (evt.target === timeInSelect || evt.target === timeOutSelect) {
      checkTimes(evt.target);
    }
  });

  avatarPicker.addEventListener('change', uploadImage);
  photoPicker.addEventListener('change', uploadImage);

  adForm.addEventListener('submit', onSubmit);
  document.querySelector('.ad-form__reset').addEventListener('click', resetForm);

  window.form = {
    disable: disableForm,
    enable: enableForm
  };

})();
