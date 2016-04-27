'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './review.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  reviewer: {type: Schema.Types.ObjectId, ref: 'User'},
  reviewed: {type: Schema.Types.ObjectId, ref: 'User'},
  time: Date,
  title: String,
  description: String,
  rating: {type: Number, min: 1, max: 5}
});

export default createSeedModel('Review', ReviewSchema, seed);
