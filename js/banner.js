'use strict';

(function () {
  var banner;
  var card = document.querySelector('.map__card');
  var adForm = document.querySelector('.ad-form');
  var requestType;

  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successBanner = successTemplate.cloneNode(true);
  var errorBanner = errorTemplate.cloneNode(true);
  var errorButton = errorBanner.querySelector('.error__button');
  var errorMessageContainer = errorBanner.querySelector('.error__message');

  var renderBanner = function (status, type, text) {

    requestType = type;
    banner = (status === 'success') ? successBanner : errorBanner;
    main.appendChild(banner);
    banner.classList.add('banner');
    document.addEventListener('keydown', window.utils.isEscPressed);
    document.addEventListener('mousedown', window.utils.isClicked);
    errorButton.addEventListener('click', onErrorButtonClicked);
    errorMessageContainer.textContent = text || errorMessageContainer.textContent;
  };

  var onErrorButtonClicked = function () {
    requestType === 'post'
      ? window.backend.save(new FormData(adForm), window.backend.onSaveSuccess, window.backend.onError)
      : window.backend.load(window.backend.onLoadSuccess, window.backend.onError);
    removeBanner();
  };

  var removeBanner = function () {
    if (banner) {
      banner.remove();
      document.removeEventListener('click', window.utils.isClicked);
    }
  };

  window.banner = {
    remove: removeBanner,
    render: renderBanner,
  };

})();
