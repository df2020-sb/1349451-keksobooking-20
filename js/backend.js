'use strict';

(function () {

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobookin';


  var onLoadSuccess = function (objects) {
    window.pins.render(objects);
  };

  var onSaveSuccess = function () {
    window.banner.render('success');
  };

  var onError = function (type, errorMessage) {
    window.banner.render('error', type, errorMessage);
  };

  var onResponse = function (xhr, type, onLoad, onError) {
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

        case 500:
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
    onLoadSuccess: onLoadSuccess,
    onSaveSuccess: onSaveSuccess,
    onError: onError,
  };

})();
