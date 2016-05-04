'use strict';

import restful from 'node-restful';
import ItemBatchModel from './item-batch.model';
import {updateItemActiveness} from '../../recommendation/models/item.elastic-model.js';

const mongoose = restful.mongoose;

var updateItemInElastic = batch => {
  return ItemBatchModel.count({beginTime: {$gt: batch.beginTime}, item: batch.item})
    .then((count) => {
      if (count === 0) {
        return updateItemActiveness(batch.item, batch.open && batch.itemsLeft !== 0);
      }
    });
};

export default app => {

  ItemBatchModel.schema.post('save', function () {
    let batch = this;
    updateItemInElastic(batch)
      .catch(console.errorJson);
  });

  const ItemBatch = restful.model('item-batch', ItemBatchModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  ItemBatch.before('put', (req, res, next) => {
    var batch = req.body;
    updateItemInElastic(batch)
      .catch(console.errorJson);
    return next();
  });


  ItemBatch.register(app, '/api/item-batch');
};
