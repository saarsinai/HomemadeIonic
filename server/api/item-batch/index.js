'use strict';

import restful from 'node-restful';
import itemBatchModel from './item-batch.model';

const mongoose = restful.mongoose;

export default app => {
  const ItemBatch = restful.model('item-batch', itemBatchModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  ItemBatch.register(app, '/api/item-batch');
};
