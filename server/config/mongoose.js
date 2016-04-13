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

/*

const addSeed = require('mongoose-plugin-seed').addSeed;
const mongooseSeed = require('mongoose-plugin-seed').seed;

// Define Schemas
var UserSchema = new Schema({ name: String, password: String, roles: [String] });
var RoleSchema = new Schema({name: String});
var ItemSchema = new Schema({name: String, user: [Schema.Types.ObjectId], description: String});

// Define Models
var Item = mongoose.model('Item', UserSchema);
var Role = mongoose.model('Role', RoleSchema);
var Item = mongoose.model('Item', ItemSchema);

// Define the seed with dependency to roles
addSeed(Item, {
  dependencies: [Role],
  seed: function (roles) {
    return [{
      username: "kobi",
      password: "123456",
      roles: roles[0]
    }, {
      username: "gal",
      password: "123456",
      roles: roles[0]
    },
      {
        username: "saar",
        password: "123456",
        roles: roles[0]
      },
      {
        username: "tamir",
        password: "123456",
        roles: roles[0]
      }];
  }
});

// Define roles seed
addSeed(Role, {
  seed: function () {
    return [{
      name: "admin"
    }, {
      name: "user"
    }];
  }
});

addSeed(Item, {
  seed: function () {
    return [{
      name: "pizza",
      description: "best pizza in the world"
    },{
      name: "burger",
      description: "best burger in the world"
    },{
      name: "pasta",
      description: "best pasta in the world"
    },{
      name: "boritto",
      description: "best boritto in the world"
    }];
  }
});

// Seed!
mongooseSeed()
  .then(function () {
    console.log('Seed Success!');
  });

*/
