'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './item-batch.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const ItemBatchSchema = new Schema({
  beginTime: Date,
  item: {type: Schema.Types.ObjectId, ref: 'Item'},
  itemsCount: { type: Number, min: 1},
  itemsLeft: { type: Number, min: 0},
  timeReady: Date,
  open: Boolean,
});

export default createSeedModel('ItemBatch', ItemBatchSchema, seed);
