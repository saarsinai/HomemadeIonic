'use strict';

import restful from 'node-restful';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './img.seed';

const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
  data: String
});

export default createSeedModel('Img', ImgSchema, seed);
