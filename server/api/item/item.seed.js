'use strict';

import User from '../user/user.model.js'
import pics from '../../utils/pics.js'
import {removeDays} from '../../utils'

export default {
  dependencies: [User],
  seed: (users) => [{
    "name": "pizza peperoni",
    "seller": users[0]._id,
    "likes": 4,
    "pricePerItem": 9,
    "details": "it's italian!! the best there is",
    "tags": ["pizza", "italian", "non-kosher"],
    "img": pics.pizza,
  },
  {
    "name": "20 nis pizza box",
    "seller": users[5]._id,
    "likes": 3,
    "pricePerItem": 20,
    "details": "Clean pizza without toppings",
    "tags": ["pizza", "cheap", "cheese","kosher", "clean"],
    "img": pics.pizza_shemesh,
  },
  {
    "name": "20 nis pizza box + bulgarian cheese",
    "seller": users[5]._id,
    "likes": 10,
    "pricePerItem": 25,
    "details": "pizza with bulgarian topping",
    "tags": ["pizza", "cheap", "cheese", "bulgarian", "kosher", "clean"],
    "img": pics.pizza_shemesh_bulg,
  },
  {
    "name": "potato soup",
    "seller": users[1]._id,
    "likes": 5,
    "pricePerItem": 13,
    "details": "soup soup soup soup!! the only greek potato soup",
    "tags": ["potato", "soup", "boring", "greek"],
    "img": pics.potato_soup,
  },
  {
    "name": "mushroom soup",
    "seller": users[1]._id,
    "likes": 3,
    "pricePerItem": 15,
    "details": "soup soup soup soup!! the price is worth it",
    "tags": ["mushroom", "soup", "creamy"],
    "img": pics.mushroom_soup,
  }]
}
