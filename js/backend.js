'use strict';

(function () {

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';

  var Status = {
    OK: 200,
    NOT_FOUND: 400,
    SERVER_ERROR: 500
  };

  var onResponse = function (xhr, type, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var errorMessage;

      switch (xhr.status) {

        case Status.OK:
          onLoad(xhr.response);
          break;

        case Status.NOT_FOUND:
          errorMessage = 'Ничего не найдено';
          break;

        case Status.SERVER_ERROR:
          errorMessage = 'Внутренняя ошибка сервера';
          break;

        default:
          errorMessage = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorMessage) {
        onError(type, errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError(type, 'Ошибка соединения');
    });
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var type = 'get';
    onResponse(xhr, type, onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var type = 'post';
    onResponse(xhr, type, onLoad, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };

})();
