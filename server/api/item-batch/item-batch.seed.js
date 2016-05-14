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
          itemsCount: 2,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 4),
          item: item._id,
          itemsCount: 2,
          itemsLeft: 2,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 50),
          item: item._id,
          itemsCount: 3,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 25),
          item: item._id,
          itemsCount: 4,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 6),
          item: item._id,
          itemsCount: 3,
          itemsLeft: 1,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 3,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 10),
          item: item._id,
          itemsCount: 1,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 2),
          item: item._id,
          itemsCount: 2,
          itemsLeft: 1,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 100),
          item: item._id,
          itemsCount: 2,
          itemsLeft: 2,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 20),
          item: item._id,
          itemsCount: 3,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 10),
          item: item._id,
          itemsCount: 3,
          itemsLeft: 0,
          open: false
        },
        {
          beginTime: removeDays(Date.now(), 5),
          item: item._id,
          itemsCount: 2,
          itemsLeft: 1,
          open: true
        }
      ],
      (item) => [
        {
          beginTime: removeDays(Date.now(), 5),
          item: item._id,
          itemsCount: 5,
          itemsLeft: 3,
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
