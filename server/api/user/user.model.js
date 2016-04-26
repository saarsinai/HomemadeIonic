'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
import Email from 'mongoose-type-email';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

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
    rating: Number,
    tags: [String],
    createdAt: Date,
    active: { type: Boolean, default: false }
  }
});

export default createSeedModel('User', UserSchema, seed);
