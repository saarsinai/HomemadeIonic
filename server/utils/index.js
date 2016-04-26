import bcrypt from 'bcrypt';

export function hash(property) {
  return function(next) {
    let user = this;
    bcrypt.hash(user[property], /* saltRounds */ 10, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user[property] = hash;
      next();
    });
  };
}
