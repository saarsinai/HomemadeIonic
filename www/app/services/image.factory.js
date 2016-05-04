angular.module('homemade')
  .factory('image', function () {
    return {
      'getDataUri': function (url, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.responseType = "arraybuffer";
        xhr.open("GET", url);

        xhr.onload = function () {
          var base64, binary, bytes, mediaType;

          bytes = new Uint8Array(xhr.response);
          //NOTE String.fromCharCode.apply(String, ...
          //may cause "Maximum call stack size exceeded"
          binary = [].map.call(bytes, function (byte) {
            return String.fromCharCode(byte);
          }).join('');
          mediaType = xhr.getResponseHeader('content-type');
          base64 = [
            'data:',
            mediaType ? mediaType + ';':'',
            'base64,',
            btoa(binary)
          ].join('');
          onSuccess(base64);
        };
        xhr.onerror = onError;
        xhr.send();
      }
    }
  });
