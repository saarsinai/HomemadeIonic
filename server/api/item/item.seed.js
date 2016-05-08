'use strict';

import User from '../user/user.model.js'
import Img from '../img/img.model.js'
import {removeDays} from '../../utils'

export default {
  dependencies: [User, Img],
  seed: (users, images) => [{
    "name": "pizza peperoni",
    "seller": users[0]._id,
    "likes": [users[1]._id, users[2]._id, users[4]._id],
    "pricePerItem": 9,
    "details": "it's italian!! the best there is",
    "tags": ["pizza", "italian", "non-kosher"],
    "img": images[0]._id,
  },
  {
    "name": "20 nis pizza box",
    "seller": users[5]._id,
    "likes": [users[3]._id, users[0]._id],
    "pricePerItem": 20,
    "details": "Clean pizza without toppings",
    "tags": ["pizza", "cheap", "cheese","kosher", "clean"],
    "img": images[3]._id,
  },
  {
    "name": "20 nis pizza box + bulgarian cheese",
    "seller": users[5]._id,
    "likes": [users[1]._id, users[3]._id, users[4]._id],
    "pricePerItem": 25,
    "details": "pizza with bulgarian topping",
    "tags": ["pizza", "cheap", "cheese", "bulgarian", "kosher", "clean"],
    "img": images[4]._id,
  },
  {
    "name": "potato soup",
    "seller": users[1]._id,
    "likes": [users[0]._id, users[2]._id, users[4]._id, users[5]._id],
    "pricePerItem": 13,
    "details": "soup soup soup soup!! the only greek potato soup",
    "tags": ["potato", "soup", "boring", "greek"],
    "img": images[1]._id,
  },
  {
    "name": "mushroom soup",
    "seller": users[1]._id,
    "likes": [users[2]._id],
    "pricePerItem": 15,
    "details": "soup soup soup soup!! the price is worth it",
    "tags": ["mushroom", "soup", "creamy"],
    "img": images[2]._id,
  }]
}
