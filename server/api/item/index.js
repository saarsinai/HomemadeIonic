'use strict';

import restful from 'node-restful';
import Item from './item.model';

const mongoose = restful.mongoose;

export default app => {
  const Item = restful.model('item', Item.schema)
    .methods(['get', 'post', 'put', 'delete']);

  Item.register(app, '/api/item');
};
