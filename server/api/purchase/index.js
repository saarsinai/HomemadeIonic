'use strict';

import restful from 'node-restful';
import purchaseModel from './purchase.model';

const mongoose = restful.mongoose;

export default app => {
  const Purchase = restful.model('purchase', purchaseModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  Purchase.register(app, '/api/purchase');
};
