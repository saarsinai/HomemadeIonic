'use strict';

import restful from 'node-restful';
import ItemModel from './item.model';
import UserModel from '../user/user.model';
import ImgModel from '../img/img.model';
import {addItem, removeItem, updateItemDetails} from '../../recommendation/models/item.elastic-model.js';


const mongoose = restful.mongoose;

var logError = err => console.errorJson(err);

export default app => {

  const saveImage = (item, next) => {
    let imageData = item.img;
    let imgModel = new ImgModel(imageData);
    imgModel.isNew = imgModel._id === undefined;
    imgModel.save()
      .then(function (img) {
        item.img = img._id;
        return next();
      }, function (err) {
        console.log('err: ' + err);
        return next(err);
      });
  };

  // it's connected to the schema because seed requests also pass here
  ItemModel.schema.pre('save', function (next) {
    let item = this;
    UserModel.findById(item.seller)
      .then(seller => {
        return addItem(item._id, item.name, item.tags, item.likes, seller.store.location);
      })
      .then(() => next())
      .catch(logError);
  });

  const Item = restful.model('item', ItemModel.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .before('post', function (req, res, next) {
      saveImage(req.body, next);
    })
    .before('put', function (req, res, next) {
      let item = req.body;
      updateItemDetails(item._id, item.name, item.tags, item.likes).catch(next);
      next();
    })
    .before('put', function (req, res, next) {
      saveImage(req.body, next);
    })
    .before('delete', function (req, res, next) {
      let itemId = req.params.id;
      removeItem(itemId).catch(next);
      next();
    });

  Item.register(app, '/api/item');
};


