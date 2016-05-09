'use strict';

import restful from 'node-restful';
import ItemModel from './item.model';
import UserModel from '../user/user.model';
import ImgModel from '../img/img.model';
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
    .before('post', function (req, res, next) {
      let imageData = req.body.img;
      console.log('body: ' + req.body);
      console.log('imageData: ' + imageData);
      let imgModel = new ImgModel(imageData);
      imgModel.save()
        .then(function (img) {
          req.body.img = img._id;
          console.logJson(img._id);
          next();
        }, function (err) {
          console.log('err: ' + err);
          next(err);
        });
    })
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


