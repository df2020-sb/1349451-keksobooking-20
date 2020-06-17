'use strict';

(function () {
  var banner;

  var removeBanner = function () {
    if (banner) {
      banner.remove();
    }
  };

  var renderBanner = function (text) {
    banner = document.createElement('div');
    banner.classList.add('error-banner');
    banner.textContent = text;
    document.body.insertAdjacentElement('afterbegin', banner);
  };

  window.errorBanner = {
    remove: removeBanner,
    render: renderBanner,
  };

})();
