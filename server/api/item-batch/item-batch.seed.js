'use strict';

import Item from '../item/item.model.js'
import {removeDays} from '../../utils'
import _ from 'lodash'

export default {
  dependencies: [Item],
  seed: (items) => {
    var options = [
      (item) => [
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 10,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 4),
          item: item._id,
          itemsCount: 10,
          itemsLeft: 2,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 50),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 25),
          item: item._id,
          itemsCount: 35,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 6),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 15,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 10),
          item: item._id,
          itemsCount: 35,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 2),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 12,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 100),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 2,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 30,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 10),
          item: item._id,
          itemsCount: 35,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 5),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 12,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 5),
          item: item._id,
          itemsCount: 20,
          itemsLeft: 5,
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
