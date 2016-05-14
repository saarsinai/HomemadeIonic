'use strict';

import restful from 'node-restful';
import ItemBatchModel from './item-batch.model';
import {updateItemActiveness} from '../../recommendation/models/item.elastic-model.js';

const mongoose = restful.mongoose;

var updateItemInElastic = batch => {
  return ItemBatchModel.count({beginTime: {$gt: batch.beginTime}, item: batch.item})
    .then((count) => {
      if (count === 0) {
        return updateItemActiveness(batch.item, batch.open);
      }
    });
};

export default app => {

  ItemBatchModel.schema.post('save', function () {
    let batch = this;
    updateItemInElastic(batch)
      .catch(console.errorJson);
  });

  const ItemBatch = restful.model('itemBatch', ItemBatchModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  ItemBatch.register(app, '/api/itemBatch');
};
