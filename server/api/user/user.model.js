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
  username: String,
  password: {type: String, select: false},
  store: {
    address: String,
    location: {
      lat: Number,
      lon: Number,
    },
    name: String,
    description: String,
    tags: [String],
    createdAt: Date,
    rating: { type: Number, min: 0.5, max: 5},
    active: { type: Boolean, default: false }
  }
}, schemaOptions);

export default createSeedModel('User', UserSchema, seed);
