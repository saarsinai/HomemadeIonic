'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import emailAddress from 'email-address';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './item.seed';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: {
    match: emailAddress.single,
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  providers: {
    facebook: {
      id: String,
      link: String
    },
    google: {
      id: String,
      link: String
    }
  },
  data: {}
});

/**
 * Plugins
 */
UserSchema
  .plugin(passportLocalMongoose, {
    usernameField: 'email'
  });

/**
 * Virtuals
 */

UserSchema
  .virtual('name.full')
  .get(function () {
    return `${this.name.first} ${this.name.last}`;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function () {
    return {
      name: this.name
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function () {
    return {
      _id: this._id
    };
  });

export default createSeedModel('Item', ItemSchema, seed);
