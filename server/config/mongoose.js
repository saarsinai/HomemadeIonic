'use strict';

import {seed} from 'mongoose-plugin-seed';
import recommendation from '../recommendation'
export default mongoose => {
  mongoose.Promise = Promise;


  var shouldSeed = JSON.parse(process.env.SEED_DB.toLowerCase());

  if (shouldSeed) {
    recommendation.initElastic()
      .then(() => seed(mongoose))
      .then(() => {
        console.log('Finished populating database.')
      })
      .catch(err => {
        console.error('Unable to populate database:', JSON.stringify(err));
      });
  }
};
