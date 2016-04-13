'use strict';

import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './item.seed';
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
