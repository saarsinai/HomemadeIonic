'use strict';

import restful from 'node-restful';
import reviewModel from './review.model';
import UserModel from '../user/user.model';
import _ from 'lodash';

const mongoose = restful.mongoose;

export default app => {
  let Review = restful.model('review', reviewModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  let calcAvgRating = (review, next) => {
    Review.aggregate(
      { $match: {reviewed: review.reviewed}},
      { $group: {_id: null, storeScore: { $avg: "$rating" }}
    }, (err, avg) => { // aggregate does not have a promise
      if (!avg || _.isEmpty(avg)) return next(restful.objectNotFound());
      if (err) return next(err);
      UserModel.update({_id: review.reviewed}, {$set: {'store.rating': avg[0].storeScore}}).then(() => next(), next);
    });
  };

  let calcAvgRatingSchema = function (next) {
    calcAvgRating(this, next);
  };

  let calcAvgRatingReq = (req, res, next) => {
    calcAvgRating(req.body, next);
  };

  Review.schema.post('save', calcAvgRatingSchema);

  Review.after('put', calcAvgRatingReq);
//Review.after('delete', calcAvgRatingReq);

  Review.register(app, '/api/review');
}
;
