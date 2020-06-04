'use strict'

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var minY = 130;
var maxY = 630;
var minPrice = 20000;
var maxPrice = 150000;
var maxGuests = 10;
var maxRooms = 12;
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// Cлучайное число в интервале включительно
var rnd = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Получаем упорядоченный массив случайной длины случайных элементов исходного массива (для features и photos)
var getRndElms = function (arr) {
  var res = [];
  var len = rnd(1, arr.length);
  while (res.length < len) {
    var randomIndex = rnd(0, arr.length - 1);
    if (res.indexOf(randomIndex) === -1) {
      res.push(randomIndex);
    }
  }
  return res.sort(function (a, b) { return a - b }).map(function (a) { return arr[a] });
}

var createObjects = function (number) {
  var objects = [];
  for (var i = 0; i < number; i++) {
    var locationX = rnd(0, map.offsetWidth);
    var locationY = rnd(minY, maxY);
    var object = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: 'Объект 0' + (i + 1),
        address: locationX + ', ' + locationY,
        price: Math.round(rnd(minPrice, maxPrice) / 100) * 100,
        type: types[rnd(0, types.length - 1)],
        rooms: rnd(1, maxGuests),
        guests: rnd(1, maxRooms),
        checkin: checkTimes[rnd(0, checkTimes.length - 1)],
        checkout: checkTimes[rnd(0, checkTimes.length - 1)],
        features: getRndElms(features),
        description: 'Описание объекта 0' + (i + 1),
        photos: getRndElms(photos),
      }
    }
    objects.push(object)
  }
  return objects
}

var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = object.location.x + pinElement.offsetWidth / 2 + 'px';
  pinElement.style.top = object.location.y + pinElement.offsetHeight + 'px';
  pinElement.querySelector('img').src = object.author.avatar;
  pinElement.querySelector('img').alt = object.offer.title;
  return pinElement
}

var objects = createObjects(8);
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderPin(objects[i]));
}
pinContainer.appendChild(fragment);





