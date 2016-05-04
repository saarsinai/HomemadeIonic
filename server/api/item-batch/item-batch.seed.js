'use strict';

import Item from '../item/item.model.js'
import {removeDays} from '../../utils'

export default {
  dependencies: [Item],
  seed: (items) =>
  [
    {
      beginTime: removeDays(Date.now(), 20),
      item: items[0]._id,
      itemsCount: 10,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 4),
      item: items[0]._id,
      itemsCount: 10,
      itemsLeft: 2,
      open: true
    },
    {
      beginTime: removeDays(Date.now(), 50),
      item: items[1]._id,
      itemsCount: 30,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 25),
      item: items[1]._id,
      itemsCount: 35,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 6),
      item: items[1]._id,
      itemsCount: 30,
      itemsLeft: 15,
      open: true
    },
    {
      beginTime: removeDays(Date.now(), 20),
      item: items[2]._id,
      itemsCount: 30,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 10),
      item: items[2]._id,
      itemsCount: 35,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 2),
      item: items[2]._id,
      itemsCount: 20,
      itemsLeft: 12,
      open: true
    },
    {
      beginTime: removeDays(Date.now(), 100),
      item: items[3]._id,
      itemsCount: 20,
      itemsLeft: 2,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 20),
      item: items[4]._id,
      itemsCount: 30,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 10),
      item: items[4]._id,
      itemsCount: 35,
      itemsLeft: 0,
      open: false
    },
    {
      beginTime: removeDays(Date.now(), 5),
      item: items[4]._id,
      itemsCount: 20,
      itemsLeft: 12,
      open: true
    }
  ]
}
