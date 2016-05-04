
import ItemModel from '../item/item.model';
import UserModel from '../user/user.model';
import PurchaseModel from '../purchase/purchase.model';
import recommendation from '../../recommendation';
import _ from 'lodash';
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

var logAndReturn = err => {
  console.logJson(err);
  res.status(500).json(err);
};

var recommend = function(req, res){

  var userId = req.params.userId;
  var location = {
    lat: Number(req.param('lat')),
    lon: Number(req.param('lon')),
  };

  PurchaseModel.find({buyer: userId}).populate('item').then(purchases => {
    var userInfo = {
      id: userId,
      location: location,
      tags: [].concat.apply([], purchases.map(p => p.item.tags))
    };
    return recommendation.recommend(userInfo);
  }).then(recommendations => {
    ItemModel.find({'_id': { $in: recommendations.map(r => r._id)}}).populate('seller').populate('img').then(items => {
      var itemsWithDistance = recommendations.map(recommendation => {
        var match = _.find(items, {'_id': mongoose.Types.ObjectId(recommendation._id)});
        var newItem = _.assign(recommendation, match.toJSON());
        return newItem;

      });

      res.json(itemsWithDistance);
    }).catch(logAndReturn);
  }).catch(logAndReturn);
};

export default app => {
  app.get('/api/recommended/:userId', recommend);
};
