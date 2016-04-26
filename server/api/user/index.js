'use strict';

import restful from 'node-restful';
import UserModel from './user.model';
import ItemModel from '../item/item.model';
import {hash} from '../../utils';
import _ from 'lodash';


export default app => {

  // This is registered to the schema because node-restful doesn't work with the seed-plugin
  UserModel.schema.pre('save', hash('password'));
  UserModel.schema.virtual('store.rating').get(function () {
    if (!this.store.active) {
      return 0;
    }
    return _.meanBy(this.store.reviews, review => review.rating);
  });

  restful.model('user', UserModel.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .route('items', {
      handler:(req, res, next) => {
        ItemModel.find({ seller: req.params.id }, function(err, list) {
          if (err) {
            next(err); // Error handling
          }
          //res.status is the status code
          res.locals.status_code = 200;

          // res.bundle is what is returned
          res.locals.bundle = list;
          next();
        });
      },
      detail: true,
      methods: ['get']
    })
    .register(app, '/api/user');
};
