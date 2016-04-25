'use strict';

import restful from 'node-restful';
import UserModel from './user.model';
import {removeProperties} from '../../utils';


export default app => {
  const User = restful.model('user', UserModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  User.after('get', removeProperties('hashed_password'));

  User.register(app, '/api/user');
};
