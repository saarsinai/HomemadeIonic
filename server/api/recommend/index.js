
import ItemModel from '../item/item.model';
import UserModel from '../user/user.model';
import PurchaseModel from '../purchase/purchase.model';
import recommendation from '../../recommendation';
import _ from 'lodash';
var mongoose = require('mongoose');

var logAndReturn = err => {
  console.errorJson(err);
  res.status(500).json(err);
};

var recommend = function(req, res){

  var from = req.param('from');
  var userId = req.params.userId;
  var location = {
    lat: Number(req.param('lat')),
    lon: Number(req.param('lon'))
  };
  var searchName = req.param('searchName');

  PurchaseModel.find({buyer: userId}).populate('item').then(purchases => {
    var userInfo = {
      id: userId,
      location: location,
      tags: _.flatten(purchases.map(p => p.item.tags))
    };
    return recommendation.recommend(userInfo, from, searchName);
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


