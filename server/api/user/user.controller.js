'use strict';

import User from './user.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

// Get list of users
export function index () {
  return User.find({});
}
