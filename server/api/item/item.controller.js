'use strict';

import Item from './item.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

// Get list of users
export function index () {
  return Item.find({});
}
//
// Get a single user
export function show (req) {
  return Item.findById(req.params.id)
    .then(errorIfEmpty);
}
//
//// Creates a new user
//export function create (req) {
//  const data = req.body;
//
//  data.type = 'student';
//
//  return new Item(data).save()
//    .then(errorIfEmpty)
//    .then(user => {
//      return {
//        token: signToken(user._id)
//      };
//    });
//}
//
//// Updates an existing user in the DB.
//export function update (req) {
//  const data = _.pick(req.body, ['name', 'email', 'type']);
//
//  return Item.findById(req.params.id)
//    .then(errorIfEmpty)
//    .then(user => user.set(data).save())
//    .then(_.noop);
//}
//
//// Deletes a user
//export function destroy (req) {
//  return Item.findOneAndRemove({_id: req.params.id})
//    .then(errorIfEmpty)
//    .then(_.noop);
//}
//
//// Change a users password
//export function changePassword (req) {
//  const oldPass = String(req.body.oldPassword);
//  const newPass = String(req.body.newPassword);
//
//  return Item.findById(req.user._id)
//    .then(errorIfEmpty)
//    .then(user => {
//      return user.authenticate(oldPass)
//        .then(isAuth => {
//          if (isAuth) {
//            return user.setPassword(newPass);
//          }
//
//          return Promise.reject(createError(403));
//        })
//        .then(_.noop);
//    });
//}
//
//// Get my info
//export function me (req) {
//  return Promise.resolve(req.user);
//}
