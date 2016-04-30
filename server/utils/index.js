import hashFunc from 'object-hash';

export function hash(property) {
  return function(next) {
    let user = this;
    user[property] = hashFunc(user[property]);
    next();
  };
};

export function removeDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() - days);
  return d.getTime();
};
