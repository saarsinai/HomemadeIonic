'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './Test.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: String
});

export default createSeedModel('Test', TestSchema, seed);
