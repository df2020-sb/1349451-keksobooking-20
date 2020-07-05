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

  var updateFeaturesList = function (ad) {
    var featuresListItems = cardElement.querySelectorAll('.popup__features li');
    var features = ad.offer.features;
    featuresListItems.forEach(function (item) {
      item.classList.add('hidden');
      checkFeaturesListItem(item, features);
    });
  };

  var checkFeaturesListItem = function (featuresListItem, featuresArray) {
    var feature = featuresArray.some(function (item) {
      return featuresListItem.classList.contains('popup__feature--' + item);
    });

    if (feature) {
      featuresListItem.classList.remove('hidden');
    }
  };

  var updatePhotosList = function (ad) {
    var photos = ad.offer.photos;
    var photosFragment = document.createDocumentFragment();
    photosContainer.innerHTML = '';
    photos.forEach(function (photo) {
      var newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = photo;
      photosFragment.appendChild(newPhoto);
    });

    photosContainer.appendChild(photosFragment);
  };

  var renderCard = function (ad) {
    var rooms = ad.offer.rooms;
    var guests = ad.offer.guests;
    var closeButton = cardElement.querySelector('.popup__close');
    var cardImage = cardElement.querySelector('.popup__avatar');

    cardImage.src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPE_TRANSLATION[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent =
      rooms + ' ' + window.utils.getNounCase(rooms, ROOMS_CASES) + ' для ' + guests + ' ' + window.utils.getNounCase(guests, GUESTS_CASES);
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    updateFeaturesList(ad);
    updatePhotosList(ad);

    closeButton.addEventListener('click', function () {
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
