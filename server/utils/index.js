import hashFunc from 'object-hash';

export function hash(property) {
  return function(next) {
    let user = this;
    user[property] = hashFunc(user[property]);
    next();
  };
};
