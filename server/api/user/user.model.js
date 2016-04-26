'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
import Email from 'mongoose-type-email';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;
const schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
};

const UserSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  age: Number,
  gender: String,
  password: {type: String, select: false},
  store: {
    address: String,
    name: String,
    description: String,
    tags: [String],
    createdAt: Date,
    reviews: {type: [{
      reviewer: String, // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
      time: Date,
      title: String,
      review: String,
      rating: {type: Number, min: 1, max: 5}
    }], select: true},
    active: { type: Boolean, default: false }
  }
}, schemaOptions);

export default createSeedModel('User', UserSchema, seed);
