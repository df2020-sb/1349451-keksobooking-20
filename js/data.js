'use strict';

(function () {

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
  var MAX_ROOMS = 12;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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


  var createObject = function (index) {
    var map = document.querySelector('.map');
    var locationX = window.utils.getRandomRangeNumber(0, map.offsetWidth);
    var locationY = window.utils.getRandomRangeNumber(MIN_Y, MAX_Y);

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
        price: Math.round(window.utils.getRandomRangeNumber(MIN_PRICE, MAX_PRICE) / 100) * 100,
        type: TYPES[window.utils.getRandomRangeNumber(0, TYPES.length - 1)],
        rooms: window.utils.getRandomRangeNumber(1, MAX_GUESTS),
        guests: window.utils.getRandomRangeNumber(1, MAX_ROOMS),
        checkin: CHECK_TIMES[window.utils.getRandomRangeNumber(0, CHECK_TIMES.length - 1)],
        checkout: CHECK_TIMES[window.utils.getRandomRangeNumber(0, CHECK_TIMES.length - 1)],
        features: window.utils.getRandomArrayElements(FEATURES),
        description: DESCRIPTIONS[index],
        photos: window.utils.getRandomArrayElements(PHOTOS),
      },
    };
  };

  var createObjectArray = function (number) {
    var objects = [];
    for (var i = 0; i < number; i++) {
      objects.push(createObject(i));
    }
    return objects;
  };

  window.data = {
    createObjects: createObjectArray,
  };

})();
