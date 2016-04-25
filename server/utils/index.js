export function removeProperties() {
  var fields = [].slice.apply(arguments);
  return (req, res, next) => {
    var items = [];
    if (res.locals.bundle instanceof Array) {
      items = res.locals.bundle;
    } else {
      items = [res.locals.bundle]
    }
    fields.forEach(field => items.forEach(item => item[field] = undefined));
    next(); // Don't forget to call next!
  };
}
