'use strict';

export default {
  seed: () => [{
    "_id": "5737418c411a61783c5ebf04",
    name: "Kobi Mizrahi",
    email: "kobi@mizrahi.ako",
    password: "1234",
    age: 24,
    store: {
      name: "Kobi's Kitchen",
      address: "Acre street 1, Rishon Lezion",
      location: {
        lat: 31.9699442,
        lon: 34.8014911
      },
      description: "The best homemade dishes, made with love!",
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
    age: 34,
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
  },
  {
    "_id": "5737418c411a61783c5ebf03",
    name: "Ron Cohen",
    email: "ron@gamil.com",
    password: "123456",
    age: 26,
    store: {
      name: "Ron's sweets",
      address: "Hachalutzim, Rishon Lezion",
      location: {
        lat: 31.985088,
        lon: 34.761441
      },
      description: "Sweets, Desserts and Cakes <3",
      createdAt: Date.now(),
      active: true,
      phone: "0529993337"
    }
    },
    {
      "_id": "5737418c411a61783c5ebf02",
      name: "Ester Levi",
      email: "ester@gamil.com",
      password: "123123",
      age: 60,
      store: {
        name: "Ester's Kitchen",
        address: "Hasmadar, Rishon Lezion",
        location: {
          lat: 31.975757,
          lon: 34.782169
        },
        description: "Famous traditional dishes from best kitchens!",
        createdAt: Date.now(),
        active: true,
        phone: "0547777321"
      }
    },
    {
      "_id": "5737418c411a61783c5ebf01",
      name: "Moshe hadad",
      email: "moshe@walla.com",
      password: "1111",
      age: 53,
      store: {
        name: "Italian chef",
        address: "Jerusalem street, Rishon Lezion",
        location: {
          lat: 31.962223,
          lon: 34.811432
        },
        description: "The best italian food in town!",
        createdAt: Date.now(),
        active: true,
        phone: "0501111990"
      }
  }
]
}
