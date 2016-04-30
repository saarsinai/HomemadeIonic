'use strict';

import restful from 'node-restful';
import imgModel from './img.model';

const mongoose = restful.mongoose;

export default app => {
  const Img = restful.model('img', imgModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  Img.register(app, '/api/img');
};
