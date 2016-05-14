'use strict';

export default {
  seed: () => [{
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
      tags: ["Italian", "Oriental", "Hituv"],
      createdAt: Date.now(),
      active: true,
    }
  },
  {
    name: "Gal Revach",
    email: "gal@space.go",
    password: "Aa12345678",
    age: 23,
    store: {
      name: "Gal's salads",
      address: "Ifyun, Makmr, Tzrifin",
      location: {
        lat: 31.9752604,
        lon: 34.7694045
      },
      description: "Over the years I've became a master of salads, I can make you a salad from just about anything.",
      tags: ["Salad", "Healthy", "Perfect"],
      createdAt: Date.now(),
      active: true,
    }
  },
  {
    name: "Saar The Hungry",
    email: "me@resturant.yum",
    age: 12,
    password: 'nomNomNom'
  },
  {
    name: "Arik Yakuel",
    email: "fun@prisha.idf",
    age: 45,
    password: ':)'
  },
  {
    name: "Tamir Lavi",
    email: "tired@work.home",
    age: 23,
    password: '@a12345678'
  },
  {
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
      tags: ["Pizza", "Cheap", "Plastic", "Kosher"],
      createdAt: Date.now(),
      active: true
    }
  }]
}
