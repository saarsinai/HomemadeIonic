'use strict';

import restful from 'node-restful';
import Item from './item.model';

const mongoose = restful.mongoose;

export default app => {
  restful.model('item', Item.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, '/api/item');
};
