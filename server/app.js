import 'dotenv/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import routesConfig from './config/routes';


var app = express();

expressConfig(app);
routesConfig(app);``
mongooseConfig(mongoose);
mongoose.connect(process.env.MONGO_URI);

app.get('/', function (req, res) {
  res.send('Homemade server is up!')
})

app.listen(process.env.PORT)



/*
/!**
 * Created by Kobi on 4/6/2016.
 *!/



require('dotenv').config();
var mongooseConfig = require('./config/mongoose');
var express = require('express')
var mongoose = require('mongoose');

var app = express()
mongooseConfig(mongoose);
mongoose.connect(process.env.MONGO_URI);

app.get('/', function (req, res) {
  res.send('Homemade server is up!')
})

app.listen(process.env.PORT)



/!**                    Seed - TODO: Separate this to each model seed.
 *!/
const addSeed = require('mongoose-plugin-seed').addSeed;
const mongooseSeed = require('mongoose-plugin-seed').seed;
const Schema = mongoose.Schema;
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
mongooseSeed(mongoose)
  .then(function () {
    console.log('Seed Success!');
  });


*/
