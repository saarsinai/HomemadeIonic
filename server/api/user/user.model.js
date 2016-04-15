'use strict';

import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

/**
 * Plugins
 */

/**
 * Virtuals
 */

export default createSeedModel('User', UserSchema, seed);
