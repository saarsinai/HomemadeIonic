'use strict';

import User from '../user/user.model.js'
import ItemBatch from '../item-batch/item-batch.model.js'
import Item from '../item/item.model.js'
import _ from 'lodash';
import {removeDays} from '../../utils'

export default {
  dependencies: [User, ItemBatch, Item],
  seed: (users, batches, items) => {

    var pArr = [];
    while (batches.length !== 0) {
      var batch = _.sample(batches);
      var user = _.sample(users);
      var numToBuy = Math.floor(Math.random() * batch.itemsCount) + 1;
      batch.itemsCount -= numToBuy;

      if (batch.itemsCount <= batch.itemsLeft) {
        var index = batches.indexOf(batch);
        batches.splice(index, 1);
      }

      var item = _.find(items, {_id: batch.item});
      pArr.push({
          item: batch.item,
          batch: batch._id,
          buyer: user._id,
          seller: item.seller,
          time: removeDays(Date.now(), Math.floor(Math.random() * 5)),
          numOfItems: numToBuy,
          price: numToBuy * item.pricePerItem,
          isActive: true
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
