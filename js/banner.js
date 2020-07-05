'use strict';

(function () {
  var banner;
  var adForm = document.querySelector('.ad-form');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successBanner = successTemplate.cloneNode(true);
  var errorBanner = errorTemplate.cloneNode(true);
  var errorButton = errorBanner.querySelector('.error__button');
  var errorMessageContainer = errorBanner.querySelector('.error__message');

  var renderBanner = function (status, type, text) {
    banner = (status === 'success') ? successBanner : errorBanner;
    main.appendChild(banner);
    banner.classList.add('banner');
    document.addEventListener('keydown', window.utils.isEscPressed);
    document.addEventListener('mousedown', window.utils.isClicked);

    errorButton.addEventListener('click', function handler() {
      errorButton.removeEventListener('click', handler);
      onErrorButtonClick(type);
    });

    errorMessageContainer.textContent = text || errorMessageContainer.textContent;
  };

  var onErrorButtonClick = function (type) {
    type === 'post' ? window.backend.save(new FormData(adForm), window.utils.onSaveSuccess, window.utils.onError) : window.backend.load(window.utils.onLoadSuccess, window.utils.onError);
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
