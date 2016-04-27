'use strict';
import User from '../user/user.model.js'

export default {
  dependencies: [User],
  seed: (users) =>
    [
      {
        reviewer: users[4]._id, // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
        reviewed: users[1]._id,
        time: Date.now(),
        title: "I HATE DALADS! (I suck at being vegetarian)",
        description: "It was just another salad, no chocolate, cream or anything tasty. overall it was tasty :)",
        rating: 2
      },
      {
        reviewer: users[2]._id, // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
        reviewed: users[0]._id,
        time: Date.now(),
        title: "It was good while I ate it",
        description: "It was real good, but after two bites I was super full and went to sleep for a while. It could use a bit of spice.",
        rating: 4
      },
      {
        reviewer: users[3]._id, // seed doesn't work with nested depedency, so compromise... {type: Schema.Types.ObjectId, ref: 'User'},
        reviewed: users[0]._id,
        time: Date.now(),
        title: "Ho! Ice Cream!",
        description: "My favorite ice cream is \"Cunkey Monkey\", its ingredients are: CREAM, SKIM MILK, LIQUID SUGAR (SUGAR, WATER), WATER, SUGAR, BANANAS, WALNUTS, COCONUT OIL, EGG YOLKS, COCOA (PROCESSED WITH ALKALI), COCOA POWDER, LEMON JUICE CONCENTRATE, GUAR GUM, NATURAL FLAVORS, MILKFAT, CARRAGEENAN, SOY LECITHIN, VANILLA EXTRACT.",
        rating: 5
      }
    ]
}
