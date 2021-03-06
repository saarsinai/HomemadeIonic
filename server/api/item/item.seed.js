'use strict';

import User from '../user/user.model.js'
import Img from '../img/img.model.js'
import {removeDays} from '../../utils'

export default {
  dependencies: [User, Img],
  seed: (users, images) => [{
    "name": "pizza peperoni",
    "seller": users[5]._id,
    "likes": [users[1]._id, users[2]._id, users[4]._id],
    "pricePerItem": 9,
    "details": "it's italian!! the best there is",
    "tags": ["pizza", "italian", "non-kosher"],
    "img": images[0]._id,
    },
    {
      "name": "Fabulous Pizza",
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
      "name": "Potato soup",
      "seller": users[1]._id,
      "likes": [users[0]._id, users[8]._id, users[4]._id, users[5]._id],
      "pricePerItem": 13,
      "details": "soup soup soup soup!! the only greek potato soup",
      "tags": ["potato", "soup", "boring", "greek"],
      "img": images[1]._id,
    },
    {
      "name": "Mushroom soup",
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
      "likes": [users[3]._id, users[8]._id, users[0]._id],
      "pricePerItem": 10,
      "details": "A dish that I learned from my grandmother and the first dish I knew to cook properly when I became a vegetarian",
      "tags": ["stuffed", "vegan", "pot", "rice", "vegetables"],
      "img": images[6]._id,
    },
    {
      "name": "Gondie",
      "seller": users[7]._id,
      "likes": [users[1]._id, users[2]._id, users[8]._id],
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
      "tags": ["meatloaf", "couscous", "children", "kids"],
      "img": images[8]._id,
    },
    {
      "name": "Gefilte fish",
      "seller": users[7]._id,
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
    },
    {
      "name": "Beef stew",
      "seller": users[7]._id,
      "likes": [users[0]._id, users[3]._id],
      "pricePerItem": 10,
      "details": "Rich beef stew, full of authentic flavors!",
      "tags": ["beef", "kosher", "stew"],
      "img": images[11]._id,
    },
    {
      "name": "Great Meatballs!",
      "seller": users[7]._id,
      "likes": [users[0]._id, users[3]._id, users[4]._id],
      "pricePerItem": 11,
      "details": "Great meatballs combined with rice and fresh tomato sauce",
      "tags": ["beef", "persian", "stew", "rice", "kids"],
      "img": images[12]._id,
    },
    {
      "name": "Hilbe soup",
      "seller": users[1]._id,
      "likes": [users[2]._id],
      "pricePerItem": 7,
      "details": "The famous hilbe soup! Tasty and healthy!",
      "tags": ["yemeni", "hilbe", "vegan", "healthy"],
      "img": images[13]._id,
    },
    {
      "name": "Beet Cuba",
      "seller": users[0]._id,
      "likes": [users[2]._id, users[0]._id, users[4]._id, users[5]._id, users[1]._id],
      "pricePerItem": 5,
      "details": "The tastiest iraqi beet cuba ever, Made from fresh ingredients",
      "tags": ["iraqi", "beet", "kosher", "healthy", "clean", "cheap"],
      "img": images[14]._id,
    },
    {
      "name": "The original Sfenge",
      "seller": users[6]._id,
      "likes": [users[2]._id, users[0]._id, users[1]._id],
      "pricePerItem": 3,
      "details": "Original Sfenge, The best you will ever taste!",
      "tags": ["iraqi", "clean", "cheap", "sweet", "kids"],
      "img": images[15]._id,
    },
    {
      "name": "Grandma's Jachnun",
      "seller": users[0]._id,
      "likes": [users[2]._id, users[3]._id, users[1]._id, users[4]._id],
      "pricePerItem": 8,
      "details": "Amazing Jachnun, authentic and tasty! Comes with tomato paste and hard-boiled egg",
      "tags": ["yemeni", "fresh", "kosher", "authentic"],
      "img": images[16]._id,
    },
    {
      "name": "Baba cookies",
      "seller": users[6]._id,
      "likes": [users[2]._id, users[3]._id],
      "pricePerItem": 8,
      "details": "Baba cookies filled with date. Sweet!",
      "tags": ["iraqi", "fresh", "sweet", "date"],
      "img": images[17]._id,
    },
    {
      "name": "Traditional fish dish chraime",
      "seller": users[0]._id,
      "likes": [users[2]._id, users[3]._id, users[5]._id, users[4]._id],
      "pricePerItem": 8,
      "details": "chraime, with locus, fresh tomatoes, and lots of spices!",
      "tags": ["fish", "fresh", "tomatoes", "spicy", "authentic", "kosher"],
      "img": images[18]._id,
    },
    {
      "name": "Filled Chicken",
      "seller": users[7]._id,
      "likes": [users[5]._id, users[4]._id],
      "pricePerItem": 25,
      "details": "Chicken filled with minced meat, rice and pine nuts. You get the whole chicken!",
      "tags": ["chicken", "family", "rice", "clean", "kosher"],
      "img": images[19]._id,
    },
    {
      "name": "Mushroom Pie",
      "seller": users[4]._id,
      "likes": [users[5]._id, users[4]._id],
      "pricePerItem": 9,
      "details": "The best mushroom pie ever! Light, airy and full of flavor! Two pieces in each dish.",
      "tags": ["mushroom", "fresh", "cheap", "kosher", "vegan", "creamy", "pie"],
      "img": images[20]._id,
    },
    {
      "name": "Broccoli Muffins",
      "seller": users[4]._id,
      "likes": [users[5]._id, users[4]._id, users[0]._id],
      "pricePerItem": 13,
      "details": "Yummy broccoli personal pies, best meal for a light dinner! 4 pieces in each dish.",
      "tags": ["broccoli", "fresh", "cheap", "vegan"],
      "img": images[21]._id,
    },
    {
      "name": "Vegetarian Couscous",
      "seller": users[4]._id,
      "likes": [users[2]._id, users[3]._id, users[5]._id, users[6]._id],
      "pricePerItem": 10,
      "details": "Vegetarian Couscous. contains carrots, beans, hummus and potatoes. Delicious!!!",
      "tags": ["couscous", "fresh", "vegan", "vegetables", "authentic"],
      "img": images[22]._id,
    },
    {
      "name": "Onion Pie",
      "seller": users[4]._id,
      "likes": [users[3]._id],
      "pricePerItem": 20,
      "details": "Delicious onion pie, suitable for any occasion and for a relaxing dinner",
      "tags": ["pie", "fresh", "vegan", "vegetables", "onion", "family"],
      "img": images[23]._id,
    },
    {
      "name": "Traditional Mafrum",
      "seller": users[0]._id,
      "likes": [users[3]._id, users[7]._id],
      "pricePerItem": 15,
      "details": "Traditional Tripolitan Mafrum, Takes you to the childhood!",
      "tags": ["potatoes", "meat", "kosher", "authentic", "tripolitan"],
      "img": images[24]._id,
    },
    {
      "name": "Homemade Ice cream",
      "seller": users[6]._id,
      "likes": [users[3]._id, users[0]._id, users[2]._id],
      "pricePerItem": 10,
      "details": "Sweet and creamy vanilla ice cream, filled with nuts and chocolate",
      "tags": ["sweet", "icecream", "creamy", "dessert", "cold"],
      "img": images[25]._id,
    },
    {
      "name": "Cheesecake with crumbs",
      "seller": users[6]._id,
      "likes": [users[3]._id, users[4]._id, users[2]._id],
      "pricePerItem": 12,
      "details": "The best cheese cake ever! Creamy and sweet! 2 pieces in each dish.",
      "tags": ["sweet", "cheese", "creamy", "dessert", "cake"],
      "img": images[26]._id,
    },
    {
      "name": "Moist chocolate cake",
      "seller": users[6]._id,
      "likes": [users[4]._id, users[7]._id],
      "pricePerItem": 27,
      "details": "A Good chocolate cake, Made with love!",
      "tags": ["sweet", "chocolate", "dessert", "cake", "moist", "kids"],
      "img": images[27]._id,
    },
    {
      "name": "Homemade Tahini",
      "seller": users[4]._id,
      "likes": [users[7]._id, users[2]._id, users[3]._id],
      "pricePerItem": 15,
      "details": "Large box of green homemade tahini. Full of herbs and spices!",
      "tags": ["tahini", "cheap"],
      "img": images[28]._id,
    },
    {
      "name": "Persian Rice",
      "seller": users[0]._id,
      "likes": [users[4]._id, users[6]._id, users[3]._id, users[5]._id, users[1]._id],
      "pricePerItem": 8,
      "details": "The traditional persian rice, with potatoes, pine nuts, herbs and spices.",
      "tags": ["authentic", "cheap", "kosher", "persian"],
      "img": images[29]._id,
    },
    {
      "name": "Tripolitan Bistil",
      "seller": users[0]._id,
      "likes": [users[4]._id, users[5]._id, users[1]._id],
      "pricePerItem": 17,
      "details": "The traditional tripolitan bistil, filled with minced meat. So good!!! Three pieces in a dish!",
      "tags": ["authentic", "potatoes", "kosher", "tripolitan", "meat"],
      "img": images[30]._id,
    },
    {
      "name": "Chili Chicken wings",
      "seller": users[7]._id,
      "likes": [users[4]._id, users[5]._id, users[1]._id, users[6]._id],
      "pricePerItem": 20,
      "details": "Hot and Spicy chili chicken wings, you will love it!",
      "tags": ["chicken", "spicy", "wings"],
      "img": images[31]._id,
    },
    {
      "name": "Sweet potatoes soup",
      "seller": users[1]._id,
      "likes": [users[4]._id, users[0]._id, users[2]._id, users[6]._id],
      "pricePerItem": 11,
      "details": "Orange soup - sweet potatoes, carrot and pumpkin falvors.",
      "tags": ["soup", "orange", "spicy", "fresh"],
      "img": images[32]._id,
    },
    {
      "name": "Eggplant salad with mayonnaise",
      "seller": users[4]._id,
      "likes": [users[7]._id, users[0]._id, users[2]._id],
      "pricePerItem": 15,
      "details": "Great eggplant salad, with mayonnaise, garlic and lemon. :)",
      "tags": ["salad", "eggplant", "clean", "vegan"],
      "img": images[33]._id,
    },
    {
      "name": "Pasta Bolognese",
      "seller": users[8]._id,
      "likes": [users[6]._id, users[1]._id, users[2]._id, users[7]._id, users[3]._id],
      "pricePerItem": 18,
      "details": "Our famous bolognese, fresh meat and vegetables. Perfect for romantic dinner or family lunch!",
      "tags": ["meat", "pasta", "tomatoes", "vegetables", "kosher", "italian"],
      "img": images[34]._id,
    },
    {
      "name": "Cheese Lasagna",
      "seller": users[8]._id,
      "likes": [users[0]._id, users[1]._id],
      "pricePerItem": 12,
      "details": "Creamy and moist italian cheese lasagna, full of unique cheeses. Yummy!",
      "tags": ["creamy", "cheese", "vegan", "italian"],
      "img": images[35]._id,
    },
    {
      "name": "Great Pizza!",
      "seller": users[8]._id,
      "likes": [users[5]._id, users[4]._id, users[2]._id],
      "pricePerItem": 25,
      "details": "Lovely pizza, with sweet potatoes, onion and mozzarella cheese. You pay for the whole tray!",
      "tags": ["pizza", "cheese", "onion", "italian", "cheap"],
      "img": images[36]._id,
    },
    {
      "name": "Cheese Ravioli in cream",
      "seller": users[8]._id,
      "likes": [users[5]._id, users[4]._id, users[2]._id, users[1]._id, users[7]._id],
      "pricePerItem": 14,
      "details": "Homemade cheese ravioli in cream sauce, herbs and pesto. You have to taste it!",
      "tags": ["ravioli", "cheese", "herbs", "italian", "pasta", "dinner"],
      "img": images[37]._id,
    },
    {
      "name": "Vanilla Cupcakes",
      "seller": users[6]._id,
      "likes": [users[8]._id, users[4]._id, users[0]._id, users[1]._id, users[7]._id],
      "pricePerItem": 20,
      "details": "Vanilla Cupcakes with strawberries frosting. Six cupcakes bundle.",
      "tags": ["sweet", "cupcakes", "vanilla"],
      "img": images[38]._id,
    },
    {
      "name": "Crispy Schnitzel",
      "seller": users[7]._id,
      "likes": [users[6]._id, users[4]._id, users[0]._id, users[3]._id, users[2]._id, users[8]._id],
      "pricePerItem": 13,
      "details": "My favorite dish - Homemade Crispy Schnitzel! So good you will lick your fingers!!",
      "tags": ["chicken", "schnitzel", "crispy", "kosher"],
      "img": images[39]._id,
    },
    {
      "name": "Chinese Corn Soup",
      "seller": users[1]._id,
      "likes": [users[8]._id, users[4]._id, users[0]._id, users[3]._id, users[2]._id],
      "pricePerItem": 10,
      "details": "Chinese Corn Soup, Just like in a restaurant, Delicious!",
      "tags": ["soup", "corn", "chinese"],
      "img": images[40]._id,
    }
]
}
