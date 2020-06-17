'use strict';

(function () {

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';

  var onResponse = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var errorMessage;

      switch (xhr.status) {

        case 200:
          onLoad(xhr.response);
          break;

        case 404:
          errorMessage = 'Ничего не найдено';
          break;

        default:
          errorMessage = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    onResponse(xhr, onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    load: load,
  };

})();
