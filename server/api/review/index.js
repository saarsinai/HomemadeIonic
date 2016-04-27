'use strict';

import restful from 'node-restful';
import reviewModel from './review.model';
import UserModel from '../user/user.model';
import _ from 'lodash';

const mongoose = restful.mongoose;

export default app => {
  let Review = restful.model('review', reviewModel.schema)
    .methods(['get', 'post', 'put', 'delete']);

  let calcAvgRating = function(req, res, next) {
    let review = req.body;
    Review.find({reviewed: review.reviewed}, 'rating', (err, reviews) => {
      if (!reviews || _.isEmpty(reviews)) return next(restful.objectNotFound());
      if (err) return next(err);

      let mean = _.meanBy(reviews, r => r.rating);

      UserModel.update({_id: review.reviewed}, {$set: {'store.rating': mean}}, (err) => {
        if (err) return next(err);
        return next();
      });
    });
  };

  Review.after('post', calcAvgRating);
  Review.after('put', calcAvgRating);
  Review.after('delete', calcAvgRating);

  Review.register(app, '/api/review');
};
