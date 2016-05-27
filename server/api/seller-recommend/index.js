import ItemModel from '../item/item.model';
import UserModel from '../user/user.model';
import PurchaseModel from '../purchase/purchase.model';
import recommendation from '../../recommendation';
import _ from 'lodash';
var mongoose = require('mongoose');

var logAndReturn = err => {
  console.logJson(err);
  res.status(500).json(err);
};

var sellerRecommend = function (req, res) {

  var sellerId = req.params.sellerId;
  UserModel.findById(sellerId).then(user => {
    var sellerInfo = {
      id: sellerId,
      location: user.store.location
    };
    return recommendation.sellerRecommend(sellerInfo);
  }).then(topTags => {
    res.json(topTags);
  }).catch(logAndReturn);
};

export default app => {
  app.get('/api/sellerRecommend/:sellerId', sellerRecommend);
};


