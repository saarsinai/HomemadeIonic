'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './item.seed';
import mongoose from 'mongoose';
//const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  pricePerItem: {
    type: Number,
    min: 0
  },
  tags: [String],
  seller: String,
  distance: Number,
  rating: Number,
  details: String
});

/**
 * Plugins
 */

/**
 * Virtuals
 */

export default createSeedModel('Item', ItemSchema, seed);
