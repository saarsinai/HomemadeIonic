'use strict';

import errorHandler from 'api-error-handler';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

export default app => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb'}));
  app.use(bodyParser.json({type:'application/vnd.api+json'}));
  app.use(methodOverride());
  app.use(allowCrossDomain);
  app.use(errorHandler());
};
