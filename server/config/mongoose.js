'use strict';

import {seed} from 'mongoose-plugin-seed';

export default mongoose => {
  mongoose.Promise = Promise;

  if (process.env.SEED_DB) {
    seed(mongoose)
      .then(() => {
        console.log('Finished populating database.')
        //logger.info('Finished populating database.');
      })
      .catch(err => {
        //logger.error({err}, 'Unable to populate database');
        console.log('Unable to populate database: ' + JSON.stringify(err));

      });
  }
};
