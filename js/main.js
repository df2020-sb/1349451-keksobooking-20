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

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardParent = document.querySelector('.map');
var cardElement = cardTemplate.cloneNode(true);
var cardNextElement = cardParent.querySelector('.map__filters-container')
var fragment = document.createDocumentFragment();

// Подбор падежей существительного в зависимости от числительных
var getNounCase = function (number, array) {
  return (
    number % 10 === 1 && number !== 11
      ? array[0]
      : (number % 10 === 2 && number !== 12) || (number % 10 === 3 && number !== 13) || (number % 10 === 4 && number !== 14)
        ? array[1]
        : array[2] || array[1])
}

// Cлучайное число в интервале включительно
var getRandomRangeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
}

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
    }
  }
}

var createObjectArray = function (number) {
  var objects = [];
  for (var i = 0; i < number; i++) {
    objects.push(createObject(i));
  }
  return objects;
}

var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = object.location.x + pinElement.offsetWidth / 2 + 'px';
  pinElement.style.top = object.location.y + pinElement.offsetHeight + 'px';
  pinImage.src = object.author.avatar;
  pinImage.alt = object.offer.title;
  return pinElement;
}

var renderCard = function (object) {
  var rooms = object.offer.rooms;
  var guests = object.offer.guests;
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

  return cardElement;
}

function updateFeaturesList(object) {
  var featuresListItems = cardElement.querySelectorAll('.popup__features li');
  var features = object.offer.features;
  for (var i = 0; i < featuresListItems.length; i++) {
    featuresListItems[i].classList.add('hidden');
    checkFeaturesListItem(featuresListItems[i], features);
  }
}

function checkFeaturesListItem(featuresListItem, featuresArray) {
  var feature = featuresArray.some(item => featuresListItem.classList.contains('popup__feature--' + item));
  if (feature) {
    featuresListItem.classList.remove('hidden');
  }
}

function updatePhotosList(object) {
  var photos = object.offer.photos;
  var photosContainer = cardElement.querySelector('.popup__photos');
  var imagesFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length - 1; i++) {
    var newImage = photosContainer.querySelector('img').cloneNode(true);
    imagesFragment.appendChild(newImage);
  }
  photosContainer.appendChild(imagesFragment);

  for (var j = 0; j < photos.length; j++) {
    photosContainer.querySelector('img:nth-child(' + (j + 1) + ')').src = photos[j];
  }
}

map.classList.remove('map--faded');

// Создаём массив объектов
var objects = createObjectArray(8);

// Рендерим пины и кладём в контейнер
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderPin(objects[i]));
}
pinContainer.appendChild(fragment);
fragment.innerHTML = '';


// Рендерим первое объявление
fragment.appendChild(renderCard(objects[0]));
cardParent.insertBefore(fragment, cardNextElement);


