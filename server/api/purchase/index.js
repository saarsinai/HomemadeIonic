'use strict';

import restful from 'node-restful';
import PurchaseModel from './purchase.model';
import BatchModel from '../item-batch/item-batch.model';

const mongoose = restful.mongoose;


export default app => {

  let updateBatch = (req, res, next) => {
    let purchase = req.body;
    console.logJson(purchase);
    BatchModel.findById(purchase.batch)
      .then((batch) => {
        if (!batch.open) {
          return next("cannot buy from closed batch");
        }

        if (batch.itemsLeft < purchase.numOfItems) {

          console.log('batch', batch._id);
          console.log('itemsLeft', batch.itemsLeft);
          console.log('numOfItems', purchase.numOfItems);
          return next("cannot buy more items than in batch");
        }

        batch.itemsLeft -= purchase.numOfItems;
        batch.open = batch.itemsLeft !== 0;
        return batch.save();
      })
      .then(() => next())
      .catch(next);
  };

  const Purchase = restful.model('purchase', PurchaseModel.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .before('post', updateBatch);

  Purchase.register(app, '/api/purchase');
};
