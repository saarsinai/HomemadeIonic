'use strict';

export default {
  seed: () => [{
    name: "Kobi Mizrahi",
    email: "kobi@mizrahi.ako",
    password: "1234",
    age: 24,
    gender: "M",
    store: {
      address: "Acre street 1, Rishon Lezion",
      name: "Kobi's Arancinies",
      description: "Like mushrooms? like rice? like frying thing?, then Arancini is the stuff for you! *does not contain mushrooms/rice",
      rating: 4.5,
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
      gender: "W",
      store: {
        address: "Ifyun, Makmr, Tzrifin",
        name: "Gal's salads",
        description: "Over the years I've became a master of salads, I can make you a salad from just about anything.",
        rating: 3,
        tags: ["Salad", "Healthy", "Perfect"],
        createdAt: Date.now(),
        active: true,
      }
    },
    {
      name: "Saar The Hungry",
      email: "me@resturant.yum",
      age: 12,
      gender: "M",
      password: 'nomNomNom'
    }
  ]
}
