'use strict';

import User from '../user/user.model.js'
import pics from '../../utils/pics.js'

export default {
  dependencies: [User],
  seed: (users) => [{
    "name": "pizza peperoni",
    "seller": users[0]._id,
    "distance": 0.7,
    "rating": 4,
    "pricePerItem": 9,
    "details": "it's italian!! the best there is",
    "tags": ["pizza", "italian", "non-kosher"],
    "img": pics.pizza,
  },
  {
    "name": "potato soup",
    "seller": users[1]._id,
    "distance": 1.1,
    "rating": 5,
    "pricePerItem": 13,
    "details": "soup soup soup soup!! the only greek potato soup",
    "tags": ["potato", "soup", "boring", "greek"],
    "img": pics.potato_soup,
  },
  {
    "name": "mushroom soup",
    "seller": users[1]._id,
    "distance": 1.4,
    "rating": 3,
    "pricePerItem": 15,
    "details": "soup soup soup soup!! the price is worth it",
    "tags": ["mushroom", "soup", "creamy"],
    "img": pics.mushroom_soup,
  }]
}
