import elastic from 'elasticSearch';
import fs from 'fs';
import _ from 'lodash'

export default function recommend(userInfo, from, searchName) {
  return new Promise(function (resolve, reject) {
    buildQuery(userInfo, from, searchName).then((query) => {
      var client = new elastic.Client({
        host: process.env.ELASTIC_URI,
        //log: 'trace'
      });

      return client.search({
        index: process.env.ELASTIC_INDEX,
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

var buildQuery = (userInfo, from, searchName) => {
  return new Promise(function (resolve, reject) {


    fs.readdir(__dirname + '/query-functions', (err, files) => {
      if (err) {
        return reject(err);
      }

      var functions = _.flatten(
        files.filter(filename => filename.match(/\.js$/i))
          .map(filename => require(__dirname + '/query-functions/' + filename).default(userInfo)));

      var functionScore = {
        "function_score": {
          "functions": functions,
          "boost_mode": "multiply"
        }
      };

      var matchSearch = {
        match_phrase_prefix: {
          name: searchName
        }
      };

      var hasSearch = searchName && searchName.length > 0;

      var query = {
        "from": from,
        "size": 10,
        "query": {
          "bool": {
            "filter": [
              {"term": {"active": true}}
            ],
            // add the search query only if a search phrase is provided
            "must": hasSearch ? [functionScore, matchSearch] : [functionScore]
          }
        },
        "script_fields": {
          "distance": {
            "script": {
              "inline": "doc['location'].distanceInKm(lat,lon)",
              "params": userInfo.location
            }
          }
        }
      };

      resolve(query);
    });
  });
};
