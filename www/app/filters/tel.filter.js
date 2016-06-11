angular.module('homemade').filter('tel', function () {
  return function (tel) {
    if (!tel) {
      return '';
    }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    var areaCode, number;

    switch (value.length) {
      case 9: // ######### -> ##-#######
        areaCode = value.slice(0, 2);
        number = value.slice(2);
        break;

      case 10: // ########## -> ###-#######
        areaCode = value.slice(0, 3);
        number = value.slice(3);
        break;

      default:
        return tel;
    }

    return (areaCode + "-" + number).trim();
  };
})
