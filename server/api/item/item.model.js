'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './item.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  pricePerItem: { type: Number, min: 0},
  tags: [String],
  seller: {type: Schema.Types.ObjectId, ref: 'User'},
  likes: [String],
  details: String,
  img: {type: Schema.Types.ObjectId, ref: 'Img'}
});

export default createSeedModel('Item', ItemSchema, seed);
