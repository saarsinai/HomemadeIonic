'use strict';

import restful from 'node-restful';
import UserModel from './user.model';
import ItemModel from '../item/item.model';
import {hashProperty, hash, setResponse} from '../../utils';
import {updateItemsLocation} from '../../recommendation/models/item.elastic-model.js';
import nodeGeocoder from 'node-geocoder'
import jwt from 'jsonwebtoken';



export default app => {
  var geocoder = nodeGeocoder('google', 'https', {apiKey: 'AIzaSyCTeACumPhF6_Pvfea5HlfclZMKwM3q-7s'});

  // This is registered to the schema because node-restful doesn't work with the seed-plugin
  UserModel.schema.pre('save', hashProperty('password'));

  restful.model('user', UserModel.schema)
    .methods(['get', 'put', 'delete'])
    .before('put', function (req, res, next) {
      let user = req.body;
      if (!user.store || !user.store.active) return next();
      ItemModel.find({seller: user._id}, '_id')
        .then(list => {
          return updateItemsLocation(list.map(item => item._id), user.store.location);
        })
        .catch(next);
      return next();
    })
    .after('put', (req, res, next) => {
      res.locals.bundle = {token: jwt.sign(user, 'homemade-secret', {expiresIn: 60 * 60 * 5})};
      next();
    })
    .route('items', {
      detail: true,
      methods: ['get'],
      handler: (req, res, next) => {
        ItemModel.find({seller: req.params.id})
          .then(list => {
            setResponse(res, 200, list);
            next();
          })
          .catch(next);
      }
    })
    .route('locate', {
      detail: false,
      methods: ['get'],
      handler: (req, res, next) => {
        var address = req.param('address');

        geocoder.geocode(address)
          .then(function (location) {
            console.logJson(location);
            setResponse(res, 200, {lat: location[0].latitude, lon: location[0].longitude});
            return next();
          })
          .catch(next);
      }
    })
    .route('authenticate', {
      detail: false,
      methods: ['post'],
      handler: (req, res, next) => {
        UserModel.findOne({username: req.body.username, password: hash(req.body.password)})
          .then(user => {
            if (!user) {
              setResponse(res, 400, {authenticated: false});
              return next();
            }

            var token = jwt.sign(user, 'homemade-secret', {expiresIn: 60 * 60 * 5});
            setResponse(res, 200, {authenticated: true, user: user, token: token});
            return next();
          })
          .catch(next);
      }
    })
    .route('signUp', {
      detail: false,
      methods: ['post'],
      handler: (req, res, next) => {
        var user = new UserModel(req.body);
        user.save()
          .then(function () {
            var token = jwt.sign(user, 'homemade-secret', {expiresIn: 60 * 60 * 5});
            setResponse(res, 201, {user: user, token: token});
            next();
          })
          .catch(next);
      }
    })
    .register(app, '/api/user');
}
