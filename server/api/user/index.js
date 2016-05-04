'use strict';

import restful from 'node-restful';
import UserModel from './user.model';
import ItemModel from '../item/item.model';
import {hash} from '../../utils';
import {updateItemsLocation} from '../../recommendation/models/item.elastic-model.js';



export default app => {

  // This is registered to the schema because node-restful doesn't work with the seed-plugin
  UserModel.schema.pre('save', hash('password'));

  restful.model('user', UserModel.schema)
    .methods(['get', 'post', 'put', 'delete'])
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
    .route('items', {
      detail: true,
      methods: ['get'],
      handler: (req, res, next) => {
        ItemModel.find({seller: req.params.id})
          .then(list => {
            //res.status is the status code
            res.locals.status_code = 200;

            // res.bundle is what is returned
            res.locals.bundle = list;
            next();
          })
          .catch(next);
      }
    })
    .register(app, '/api/user');
};
