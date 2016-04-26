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
      tags: ["Italian", "Oriental", "Hituv"],
      createdAt: Date.now(),
      reviews: [
        {
          reviewer: "Saar The Hungry", // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
          time: Date.now(),
         title: "It was good while I ate it",
         review: "It was real good, but after two bites I was super full and went to sleep for a while. It could use a bit of spice.",
         rating: 4
        },
        {
          reviewer: "Arik Yakuel", // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
          time: Date.now(),
          title: "Ho! Ice Cream!",
          review: "My favorite ice cream is \"Cunkey Monkey\", its ingredients are: CREAM, SKIM MILK, LIQUID SUGAR (SUGAR, WATER), WATER, SUGAR, BANANAS, WALNUTS, COCONUT OIL, EGG YOLKS, COCOA (PROCESSED WITH ALKALI), COCOA POWDER, LEMON JUICE CONCENTRATE, GUAR GUM, NATURAL FLAVORS, MILKFAT, CARRAGEENAN, SOY LECITHIN, VANILLA EXTRACT.",
          rating: 5
        }
      ],
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
        tags: ["Salad", "Healthy", "Perfect"],
        createdAt: Date.now(),
        reviews: [{
          reviewer: "Tamir Lavi", // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
          time: Date.now(),
          title: "I HATE DALADS! (I suck at being vegetarian)",
          review: "It was just another salad, no chocolate, cream or anything tasty. overall it was tasty :)",
          rating: 2
        }],
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
