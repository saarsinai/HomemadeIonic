/**
 * Created by Kobi on 4/6/2016.
 */
require('dotenv').config();
var express = require('express')
var mongoose = require('mongoose');

var app = express()
mongoose.connect(process.env.MONGO_URI);

app.get('/', function (req, res) {
  res.send('Homemade server is up!')
})

app.listen(process.env.PORT)

var Item = mongoose.model('Item', { name: String });

var hamburger = new Item({ name: 'Hamburger' });
//hamburger.save(function (err) {
//  if (err) {
//    console.log(err);
//  } else {
//    console.log('meow');
//  }
//});
hamburger.save().then((doc, err) => {
  console.log(doc);
  console.log(err);
})
