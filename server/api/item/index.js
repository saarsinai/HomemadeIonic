'use strict';

import restful from 'node-restful';
import ItemModel from './item.model';
import UserModel from '../user/user.model';
import BatchModel from '../item-batch/item-batch.model';
import PurchaseModel from '../purchase/purchase.model';
import ImgModel from '../img/img.model';
import {setResponse} from '../../utils';
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
    .methods(['get', 'post', 'put'])
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
    .route('', {
      detail: true,
      methods: ['delete'],
      handler: (req, res, next) => {
        let itemId = req.params.id;

        PurchaseModel.count({item: itemId, isActive: true})
          .then(numOfActive => {
            if (numOfActive > 0) {
              return Promise.reject({code: 400, data: { message: 'Cannot delete a item with active orders'}})
            }

            var itemPromise = ItemModel.findByIdAndUpdate(itemId, {$set: {deleted: true}});
            var batchPromise = BatchModel.update({item: itemId}, {open: false}, {multi: true});
            var elasticPromise = removeItem(itemId);
            return Promise.all([itemPromise, batchPromise, elasticPromise])
              .then(() => {
                setResponse(res, 200);
                return next();
              }, (err) => {
                return Promise.reject({code: 500, data: err});
              });
          }, (err) => {
            return Promise.reject({code: 500, data: err});
          })
          .catch(err => {
            setResponse(res, err.code, err.data);
            logError(err);
            return next();
          });
      }
    });

  Item.register(app, '/api/item');
};


