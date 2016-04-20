'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

export default createSeedModel('User', UserSchema, seed);
