'use strict';

export default {
  seed: () => [{
    "_id": "5737418c411a61783c5ebf04",
    name: "Kobi Mizrahi",
    email: "kobi@mizrahi.ako",
    password: "1234",
    age: 24,
    store: {
      name: "Kobi's Arancinies",
      address: "Acre street 1, Rishon Lezion",
      location: {
        lat: 31.9699442,
        lon: 34.8014911
      },
      description: "Like mushrooms? like rice? like frying thing?, then Arancini is the stuff for you! *does not contain mushrooms/rice",
      createdAt: Date.now(),
      active: true,
      phone: "0546664447"
    }
  },
  {
    "_id": "5737418c411a61783c5ebf05",
    name: "Gal Revach",
    email: "gal@space.go",
    password: "Aa12345678",
    age: 23,
    store: {
      name: "Gal's soups",
      address: "Ifyun, Makmr, Tzrifin",
      location: {
        lat: 31.970359,
        lon: 34.773171
      },
      description: "Over the years I've became a master of soups, I can make you a soup from just about anything.",
      createdAt: Date.now(),
      active: true,
      phone: "0522264447"
    }
  },
  {
    "_id": "5737418c411a61783c5ebf06",
    name: "Saar The Hungry",
    email: "me@resturant.yum",
    age: 12,
    password: 'nomNomNom'
  },
  {
    "_id": "5737418c411a61783c5ebf07",
    name: "Arik Yakuel",
    email: "fun@prisha.idf",
    age: 45,
    password: ':)'
  },
  {
    "_id": "5737418c411a61783c5ebf08",
    name: "Tamir Lavi",
    email: "tired@work.home",
    age: 23,
    password: '@a12345678',
    store: {
      name: "World of veggies",
      address: "Rival 4, Rishon Lezion",
      location: {
        lat: 31.974809,
        lon: 34.771714
      },
      description: "You will not find replicas of meat but dished that glorify the vegetarian world",
      createdAt: Date.now(),
      active: true,
      phone: "0501234567"
    }
  },
  {
    "_id": "5737418c411a61783c5ebf09",
    name: "Omer Shemesh",
    email: "cheap@stomach.com",
    password: "Aa12345678",
    age: 53,
    store: {
      name: "Pizza Shemesh",
      address: "Waitzman, Rishon Lezion",
      location: {
        lat: 31.969349,
        lon: 34.804459
      },
      description: "Cheap pizzas for everyone! except lactose intolerance people",
      createdAt: Date.now(),
      active: true,
      phone: "0533333333"
    }
  }]
}
