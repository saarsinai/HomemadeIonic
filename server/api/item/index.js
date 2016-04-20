'use strict';

import restful from 'node-restful';
import ItemModel from './item.model';

const mongoose = restful.mongoose;

export default app => {
  const Item = restful.model('item', ItemModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  Item.register(app, '/api/item');
};
