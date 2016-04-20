'use strict';

import restful from 'node-restful';
import UserModel from './user.model';

export default app => {
  const User = restful.model('user', UserModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  User.register(app, '/api/user');
};
