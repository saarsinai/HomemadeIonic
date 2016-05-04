import elastic from 'elasticSearch';
import fs from 'fs';

export default function recommend(userInfo) {
  return new Promise(function (resolve, reject) {
    buildQuery(userInfo).then((query) => {
      var client = new elastic.Client({
        host: process.env.ELASTIC_URI,
        //log: 'trace'
      });

      return client.search({
        index: 'homemade',
        type: 'items',
        body: query
      });

    }, reject).then(function (resp) {
      resolve(resp.hits.hits.map(hit => {
        return {_id: hit._id, distance: hit.fields.distance[0]}
      }));
    }, reject);
  });
};

var buildQuery = (userInfo) => {
  return new Promise(function (resolve, reject) {
    var functions = [];

    fs.readdir(__dirname + '/query-functions', (err, files) => {
      if (err) {
        return reject(err);
      }

      files.filter(filename => filename.match(/\.js$/i))
        .forEach(filename => functions.concat(require(__dirname + '/query-functions/' + filename).default(userInfo)));

      var query = {
        "query": {
          "function_score": {
            "functions": functions,
            "boost_mode": "sum"
          }
        },
        "script_fields" : {
          "distance" : {
            "script" : {
              "inline": "doc['location'].distanceInKm(lat,lon)",
              "params" : userInfo.location
            }
          }
        }
      };

      resolve(query);
    });
  });
};