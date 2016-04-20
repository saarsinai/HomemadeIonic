'use strict';

import restful from 'node-restful';
import {UserSchema} from './user.model';

export default app => {
  restful.model('user', UserSchema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, '/api/user');
};
