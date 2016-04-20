'use strict';

import errorHandler from 'api-error-handler';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

export default app => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({type:'application/vnd.api+json'}));
  app.use(allowCrossDomain);
  app.use(methodOverride());
  app.use(errorHandler());
};
