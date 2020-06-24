'use strict';

(function () {

  var GUESTS_CASES = ['гостя', 'гостей'];
  var ROOMS_CASES = ['комната', 'комнаты', 'комнат'];
  var TYPE_TRANSLATION = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var card;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardParent = document.querySelector('.map');
  var cardElement = cardTemplate.cloneNode(true);
  var cardNextElement = cardParent.querySelector('.map__filters-container');
  var photosContainer = cardElement.querySelector('.popup__photos');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos img');

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
      rooms + ' ' + window.utils.getNounCase(rooms, ROOMS_CASES) + ' для ' + guests + ' ' + window.utils.getNounCase(guests, GUESTS_CASES);
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = object.offer.description;
    updateFeaturesList(object);
    updatePhotosList(object);

    closeButton.addEventListener('click', function (evt) {
      cardElement.classList.add('hidden');
      document.removeEventListener('keydown', window.utils.isEscPressed);
    });

    cardParent.insertBefore(cardElement, cardNextElement);
    cardElement.classList.remove('hidden');
    card = cardElement;

    document.addEventListener('keydown', window.utils.isEscPressed);
  };

  var removeCard = function () {
    if (card) {
      card.remove();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };

})();
