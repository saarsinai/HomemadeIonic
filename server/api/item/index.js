'use strict';

import restful from 'node-restful';
import {ItemSchema} from './item.model';

const mongoose = restful.mongoose;

export default app => {
  restful.model('item', ItemSchema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, '/api/item');
};
