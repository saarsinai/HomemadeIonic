import hashFunc from 'object-hash';

export let hash = hashFunc;

export function hashProperty(property) {
  return function(next) {
    let user = this;
    user[property] = hash(user[property]);
    next();
  };
};

export function removeDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() - days);
  return d.getTime();
};

export function setResponse(res, statusCode, data){
  res.locals.status_code = statusCode;
  res.locals.bundle = data;
}
