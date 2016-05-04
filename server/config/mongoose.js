'use strict';

import {seed} from 'mongoose-plugin-seed';
import recommendation from '../recommendation'
export default mongoose => {
  mongoose.Promise = Promise;

  if (process.env.SEED_DB) {
    recommendation.initElastic()
      .then(() => seed(mongoose))
      .then(() => {
        console.log('Finished populating database.')
      })
      .catch(err => {
        console.log('Unable to populate database: ' + JSON.stringify(err));
      });
  }
};
