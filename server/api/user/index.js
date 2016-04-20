'use strict';

import restful from 'node-restful';
import User from './user.model';

export default app => {
  restful.model('user', User.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, '/api/user');
};
