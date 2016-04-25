'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
import Email from 'mongoose-type-email';
import hashPlugin from 'mongoose-hashed-property';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  age: Number,
  gender: String,
  store: {
    address: String,
    name: String,
    description: String,
    tags: [String],
    createdAt: Date,
    active: { type: Boolean, default: false }
  }
});

UserSchema.plugin(hashPlugin);
export default createSeedModel('User', UserSchema, seed);
