'use strict';

import restful from 'node-restful';
import ItemModel from './item.model';

const mongoose = restful.mongoose;

export default app => {
  const Item = restful.model('item', ItemModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

/*
  Item.route('calc.get', (req, res, next) => {
    res.send('5');
  });

 Item.before('get', (req, res, next) => {
  if (valid) {
    next();
  }
 });
*/

  Item.register(app, '/api/item');
};
