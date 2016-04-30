'use strict';

import User from '../user/user.model.js'
import ItemBatch from '../item-batch/item-batch.model.js'
import {removeDays} from '../../utils'

export default {
  dependencies: [User, ItemBatch],
  seed: (users, batches) => {

    var pArr = [];
    while (batches.length !== 0) {
      var batch = batches[Math.floor(Math.random() * batches.length)];
      var user = users[Math.floor(Math.random() * users.length)];
      var numToBuy = Math.floor(Math.random() * batch.itemsLeft) + 1;
      batch.itemsLeft -= numToBuy;

      if (batch.itemsLeft < 1) {
        var index = batches.indexOf(batch);
        console.log(index);
        batches.splice(index, 1);
      }

      pArr.push({
          item: batch.item,
          batch: batch._id,
          buyer: user._id,
          time: removeDays(Date.now(), Math.floor(Math.random() * 5)),
          numOfItems: numToBuy,
          price: Math.floor(Math.random() * 45) + 5,
      });
    }

    return pArr;
  }
  //[{
  //  item: items[0]._id,
  //  sale: batches[0]._id,
  //  buyer: users[5]._id,
  //  time: removeDays(Date.now(), 19),
  //  numOfItems: 2,
  //  price: 20,
  //},
  //{
  //  item: items[0]._id,
  //  sale: batches[1]._id,
  //  buyer: users[2]._id,
  //  time: removeDays(Date.now(), 2),
  //  numOfItems: 3,
  //  price: 27,
  //},
  //{
  //  item: items[1]._id,
  //  sale: batches[2]._id,
  //  buyer: users[4]._id,
  //  time: removeDays(Date.now(), 45),
  //  numOfItems: 1,
  //  price: 27,
  //},
  //{
  //  item: items[1]._id,
  //  sale: batches[2]._id,
  //  buyer: users[4]._id,
  //  time: removeDays(Date.now(), 45),
  //  numOfItems: 1,
  //  price: 27,
  //},
  //{
  //  item: items[1]._id,
  //  sale: batches[2]._id,
  //  buyer: users[4]._id,
  //  time: removeDays(Date.now(), 45),
  //  numOfItems: 1,
  //  price: 27,
  //}]
}
