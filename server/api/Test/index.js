'use strict';

import restful from 'node-restful';
import TestModel from './Test.model';

const mongoose = restful.mongoose;

export default app => {
  const Test = restful.model('Test', TestModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  Test.register(app, '/api/Test');
};
