'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './purchase.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  item: {type: Schema.Types.ObjectId, ref: 'Item'},
  batch: {type: Schema.Types.ObjectId, ref: 'ItemBatch'},
  buyer: {type: Schema.Types.ObjectId, ref: 'User'},
  time: Date,
  numOfItems: {type: Number, min: 1},
  price: {type: Number, min: 0},
  isActive: {type: Boolean}
});

export default createSeedModel('Purchase', PurchaseSchema, seed);
