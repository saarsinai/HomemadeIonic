'use strict';

import restful from 'node-restful';
import User from './user.model';

export default app => {
  const User = restful.model('user', User.schema)
    .methods(['get', 'post', 'put', 'delete']);

  User.register(app, '/api/user');
};
