'use strict'

var TITLES = [
  'Квартира студия в таунхаусе 40 м2. Рядом с морем.',
  'Уютная, тихая квартира в центре',
  'Современная студия для комфортного проживания',
  'Двухкомнатные апартаменты в самом центре города',
  'Летний дом',
  'Комфортабельная квартира',
  'Уютная квартира в спальном районе',
  'Тёплый коттедж (посуточно/долгий срок)'];
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 30000;
var MAX_GUESTS = 10;
var GUESTS_CASES = ['гостя', 'гостей'];
var MAX_ROOMS = 12;
var ROOMS_CASES = ['комната', 'комнаты', 'комнат']
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_TRANSLATION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var DESCRIPTIONS = [
  'Квартира - студия 40 м2. На втором этаже в таунхаусе. Два дивана, обеденная зона, душевая кабина, два шкафа, теплый пол. В квартире есть дополнительный выход на придомовой участок.',
  '5 минут от аэроэкспресса и от железнодорожного вокзала. 7 минут от исторического центра, доброжелательная хозяйка, милые собака и черная кошка, помощь в ориентации по городу.',
  'Студия с современным дизайн-ремонтом, со всеми удобствами для проживания. До центра города 10 мин на машине.Рядом три остановки, ближайшая 2 мин пешком.',
  'Уютная квартира с видом на море, в центре города в шаговой доступности парки, набережные, кафе и городские достопримечательности. Есть всё необходимое для комфортного проживания.',
  'Большой газон, сирень, вишня, яблони, сливы... Кухня - отдельный вход с веранды, душ и туалет летний, водопровод, электрообогреватель, газ.',
  'Комфортабельная квартира в центре города , с ремонтом. Имеется все самое необходимое для комфортного проживание.',
  '2 жилых комнаты, кухня, ванная комната, туалет (удобства в доме). Пол теплый. Отопление – котел.',
  'Сдаю тёплый коттедж, большая площадь участка, бассейн, баня, рядом находится река «Ока», Тихое и уютное место. Доброжелательные и дружелюбные соседи, в доме есть удобства.'];

var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var MAIN_PIN_POINTER_HEIGHT = 22;
var MAIN_PIN_IMAGE_TRANSLATE_Y = -7;

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');
var mainPinImage = mainPin.querySelector('img');
var titleInput = document.querySelector('#title');
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var priceInput = document.querySelector('#price');
var typeSelect = document.querySelector('#type');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardParent = document.querySelector('.map');
var cardElement = cardTemplate.cloneNode(true);
var cardNextElement = cardParent.querySelector('.map__filters-container');

var photosContainer = cardElement.querySelector('.popup__photos');
var photoTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup__photos img')

var fragment = document.createDocumentFragment();

/* СОЗДАНИЕ МАССИВА ОБЪЕКТОВ *******************************************************************************/

var createObjectArray = function (number) {
  var objects = [];
  for (var i = 0; i < number; i++) {
    objects.push(createObject(i));
  }
  return objects;
};

var createObject = function (index) {
  var locationX = getRandomRangeNumber(0, map.offsetWidth);
  var locationY = getRandomRangeNumber(MIN_Y, MAX_Y);
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    },
    location: {
      x: locationX,
      y: locationY,
    },
    offer: {
      title: TITLES[index],
      address: locationX + ', ' + locationY,
      price: Math.round(getRandomRangeNumber(MIN_PRICE, MAX_PRICE) / 100) * 100,
      type: TYPES[getRandomRangeNumber(0, TYPES.length - 1)],
      rooms: getRandomRangeNumber(1, MAX_GUESTS),
      guests: getRandomRangeNumber(1, MAX_ROOMS),
      checkin: CHECK_TIMES[getRandomRangeNumber(0, CHECK_TIMES.length - 1)],
      checkout: CHECK_TIMES[getRandomRangeNumber(0, CHECK_TIMES.length - 1)],
      features: getRandomArrayElements(FEATURES),
      description: DESCRIPTIONS[index],
      photos: getRandomArrayElements(PHOTOS),
    },
  }
};

// Cлучайное число в интервале включительно
var getRandomRangeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Получаем упорядоченный массив случайной длины случайных элементов исходного массива (для features и photos)
var getRandomArrayElements = function (arr) {
  var res = [];
  var len = getRandomRangeNumber(1, arr.length);
  while (res.length < len) {
    var randomIndex = getRandomRangeNumber(0, arr.length - 1);
    if (res.indexOf(randomIndex) === -1) {
      res.push(randomIndex);
    }
  }
  return res.sort(function (a, b) { return a - b }).map(function (a) { return arr[a] });
};


/* ЗАПОЛНЕНИЕ КАРТЫ *******************************************************************************/

var addPinsToMap = function () {
  var objects = createObjectArray(8);
  renderAllPins(objects);
  showCard(objects[0])
}

var showCard = function (object) {
  var card = renderCard(object);
  cardParent.insertBefore(card, cardNextElement);
  card.classList.remove('hidden');
}

var onEscPress = function (evt) {
  if (evt.keyCode === 27) {
    var card = document.querySelector('.map__card')
    card.classList.add('hidden');
  }
};

var renderAllPins = function (objects) {
  objects.forEach(function (a) {
    fragment.appendChild(renderPin(a))
  });
  pinContainer.appendChild(fragment);
  fragment.innerHTML = '';
};

var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = object.location.x + pinElement.offsetWidth / 2 + 'px';
  pinElement.style.top = object.location.y + pinElement.offsetHeight + 'px';
  pinImage.src = object.author.avatar;
  pinImage.alt = object.offer.title;

  pinElement.addEventListener('click', function () {
    showCard(object)
  });

  return pinElement;
};

var renderCard = function (object) {
  var rooms = object.offer.rooms;
  var guests = object.offer.guests;
  var closeButton = cardElement.querySelector('.popup__close');
  var cardImage = cardElement.querySelector('.popup__avatar');

  cardImage.src = object.author.avatar;
  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPE_TRANSLATION[object.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent =
    rooms + ' ' + getNounCase(rooms, ROOMS_CASES) + ' для ' + guests + ' ' + getNounCase(guests, GUESTS_CASES);
  cardElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = object.offer.description;
  updateFeaturesList(object);
  updatePhotosList(object);

  closeButton.addEventListener('click', function (evt) {
    cardElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  });

  return cardElement;
};


var updateFeaturesList = function (object) {
  var featuresListItems = cardElement.querySelectorAll('.popup__features li');
  var features = object.offer.features;
  for (var i = 0; i < featuresListItems.length; i++) {
    featuresListItems[i].classList.add('hidden');
    checkFeaturesListItem(featuresListItems[i], features);
  }
};

var checkFeaturesListItem = function (featuresListItem, featuresArray) {
  var feature = featuresArray.some(function (item) {
    return featuresListItem.classList.contains('popup__feature--' + item);
  });
  if (feature) {
    featuresListItem.classList.remove('hidden');
  }
};

var updatePhotosList = function (object) {
  var photos = object.offer.photos;
  photosContainer.innerHTML = '';
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photos[i];
    photosFragment.appendChild(newPhoto);
  }
  photosContainer.appendChild(photosFragment);
};

var getNounCase = function (number, array) {
  return (
    number % 10 === 1 && number !== 11
      ? array[0]
      : (number % 10 === 2 && number !== 12) || (number % 10 === 3 && number !== 13) || (number % 10 === 4 && number !== 14)
        ? array[1]
        : array[2] || array[1])
};

/* АКТИВАЦИЯ СТРАНИЦЫ *******************************************************************************/

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  toggleDisableForm(adForm);
  updateAddressInputValue(mainPin);
  addPinsToMap();
  mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
  mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
};

var toggleDisableForm = function (form) {
  form.querySelectorAll('fieldset').forEach(function (a) {
    a.disabled = !a.disabled;
  });
};

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

/* ВАЛИДАЦИЯ ФОРМЫ *******************************************************************************/


var checkCapacity = function (rooms, capacity) {
  var message = '';
  rooms = parseInt(rooms);
  capacity = parseInt(capacity);

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

var updatePriceInputPlaceholder = function (type) {
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
}

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

var mainPinMousedownHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

var mainPinKeyDownHandler = function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
};

window.onload = function () {
  updateAddressInputValue(mainPin);
  toggleDisableForm(adForm);
  updatePriceInputPlaceholder(typeSelect.value);
  checkCapacity(roomNumberSelect.value, capacitySelect.value);
};

mainPin.addEventListener('mousedown', mainPinMousedownHandler);
mainPin.addEventListener('keydown', mainPinKeyDownHandler);

document.addEventListener('keydown', onEscPress);
