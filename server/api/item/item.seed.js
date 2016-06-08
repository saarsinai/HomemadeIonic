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
      "tags": ["pizza", "cheap", "cheese", "kosher", "clean"],
      "img": images[3]._id,
    },
    {
      "name": "20 nis pizza box",
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
      "likes": [users[0]._id, users[2]._id, users[4]._id],
      "pricePerItem": 15,
      "details": "soup soup soup soup!! the price is worth it",
      "tags": ["mushroom", "soup", "creamy"],
      "img": images[2]._id,
    },
    {
      "name": "Hungarian soup",
      "seller": users[1]._id,
      "likes": [users[4]._id],
      "pricePerItem": 20,
      "details": "Soup with spatzle",
      "tags": ["Spätzle", "soup", "hungarian"],
      "img": images[5]._id,
    },
    {
      "name": "Stuffed Zucchinis",
      "seller": users[4]._id,
      "likes": [users[3]._id, users[5]._id, users[0]._id],
      "pricePerItem": 10,
      "details": "A dish that I learned from my grandmother and the first dish I knew to cook properly when I became a vegetarian",
      "tags": ["stuffed", "vegan", "pot", "rice", "vegetables"],
      "img": images[6]._id,
    },
    {
      "name": "Gondie",
      "seller": users[1]._id,
      "likes": [users[1]._id, users[2]._id, users[3]._id],
      "pricePerItem": 20,
      "details": "The one that really is comfort food",
      "tags": ["meatball", "soup", "persian", "chickpeas"],
      "img": images[7]._id,
    },
    {
      "name": "Meatloaf with Israeli couscous",
      "seller": users[0]._id,
      "likes": [users[1]._id, users[2]._id, users[3]._id],
      "pricePerItem": 30,
      "details": "For adults and children as well",
      "tags": ["Meatloaf", "couscous", "children", "kids"],
      "img": images[8]._id,
    },
    {
      "name": "Gefilte fish",
      "seller": users[0]._id,
      "likes": [users[1]._id, users[4]._id, users[5]._id],
      "pricePerItem": 15,
      "details": "The classical jewish dish with a carrot on top!",
      "tags": ["fish", "jewish", "kosher", "carrot"],
      "img": images[9]._id,
    },
    {
      "name": "Stuffed bell pepper",
      "seller": users[4]._id,
      "likes": [users[0]._id, users[3]._id, users[1]._id],
      "pricePerItem": 18,
      "details": "A traditional dish that you just can't get enough",
      "tags": ["stuffed", "vegan", "bell pepper", "pepper", "rice"],
      "img": images[10]._id,
    }]
}
