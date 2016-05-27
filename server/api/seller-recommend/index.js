
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

var sellerRecommend = function(req, res){

  var sellerId = req.params.sellerId;
  UserModel.findById(sellerId).then(user => {
    var sellerInfo = {
      id: sellerId,
      location: user.store.location
    };
    return recommendation.sellerRecommend(sellerInfo);
  }).then(recommendations => {

  //  ItemModel.find({'_id': { $in: recommendations.map(r => r._id)}}).populate('seller').populate('img').then(items => {
  //    var itemsWithDistance = recommendations.map(recommendation => {
  //      var match = _.find(items, {'_id': mongoose.Types.ObjectId(recommendation._id)});
  //      var newItem = _.assign(recommendation, match.toJSON());
  //      return newItem;
  //
  //    });
  //
  //    res.json(itemsWithDistance);
  //  }).catch(logAndReturn);
      res.json(recommendations);
  }).catch(logAndReturn);
};

export default app => {
  app.get('/api/sellerRecommend/:sellerId', sellerRecommend);
};


