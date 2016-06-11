'use strict';

import Item from '../item/item.model.js'
import {removeDays} from '../../utils'
import {add_minutes} from '../../utils'
import _ from 'lodash'

export default {
  dependencies: [Item],
  seed: (items) => {
    var options = [
      (item) => [
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 20), 30),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 4),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 2,
          timeReady: add_minutes(removeDays(Date.now(), 4), 25),
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 50),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 50), 30),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 25),
          item: item._id,
          itemsCount: 40,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 25), 40),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 6),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 1,
          timeReady: add_minutes(removeDays(Date.now(), 6), 45),
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 20), 30),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 10),
          item: item._id,
          itemsCount: 10,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 10), 32),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 2),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 1,
          timeReady: add_minutes(removeDays(Date.now(), 2), 30),
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 100),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 2,
          timeReady: add_minutes(removeDays(Date.now(), 100), 30),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 20), 35),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 10),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          timeReady: add_minutes(removeDays(Date.now(), 10), 40),
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 5),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 1,
          timeReady: add_minutes(removeDays(Date.now(), 5), 30),
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 5),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 3,
          timeReady: add_minutes(removeDays(Date.now(), 5), 38),
          open: true
        }
      ],
      (item) => []
    ];

    var batches = _.flatten(items.map(item => {
      return _.sample(options)(item);
    }));

    return batches;
  }
}
