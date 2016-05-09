'use strict';

import errorHandler from 'api-error-handler';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';
import expressJwt from 'express-jwt'
import {setResponse} from '../utils';

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

const changeLimitToNumeric = (req, res, next) => {
  if (req.query.limit) {
    req.query.limit = Number(req.param('limit'));
  }
  next();
};

export default app => {
  var enforceAuth = JSON.parse(process.env.ENFORCE_AUTHENTICATION.toLowerCase());

  app.use(allowCrossDomain);

  app.use(changeLimitToNumeric)

  app.use('/', expressJwt({
    secret: 'homemade-secret',
    credentialsRequired: enforceAuth
  }).unless({path: ['/api/user/authenticate', '/api/user/signUp']}));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended': 'true'}));
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb'}));
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(methodOverride());
  app.use(errorHandler());
};
