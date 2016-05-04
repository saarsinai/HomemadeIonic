'use strict';

import restful from 'node-restful';
import ItemModel from './item.model';
import UserModel from '../user/user.model';
import {addItem, removeItem, updateItemTagsAndLikes} from '../../recommendation/models/item.elastic-model.js';


const mongoose = restful.mongoose;

var logError = err => console.errorJson(err);

export default app => {

  // it's connected to the schema because seed requests also pass here
  ItemModel.schema.pre('save', function (next) {
    let item = this;
    UserModel.findById(item.seller)
      .then(seller => {
        return addItem(item._id, item.tags, item.likes, seller.store.location);
      })
      .then(() => next())
      .catch(logError);
  });

  const Item = restful.model('item', ItemModel.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .before('put', function (req, res, next) {
      let item = req.body;
      updateItemTagsAndLikes(item._id, item.tags, item.likes).catch(next);
      next();
    })
    .before('delete', function (req, res, next) {
      let itemId = req.params.id;
      removeItem(itemId).catch(next);
      next();
    });

  Item.register(app, '/api/item');
};


