import elastic from 'elasticSearch';
import fs from 'fs';
import _ from 'lodash'

export default function sellerRecommend(sellerInfo) {
  return new Promise(function (resolve, reject) {
    buildQuery(sellerInfo).then((query) => {
      var client = new elastic.Client({
        host: process.env.ELASTIC_URI,
        //log: 'trace'
      });

      return client.search({
        index: process.env.ELASTIC_INDEX,
        type: 'purchases',
        body: query
      });

    }, reject).then(function (resp) {
      resolve(resp.aggregations.tags.buckets);
    }, reject);
  });
};

var buildQuery = (sellerInfo) => {
  return new Promise(function (resolve, reject) {


    fs.readdir(__dirname + '/seller-query-functions', (err, files) => {
      if (err) {
        return reject(err);
      }

      var functions = _.flatten(
        files.filter(filename => filename.match(/\.js$/i))
          .map(filename => require(__dirname + '/seller-query-functions/' + filename).default(sellerInfo)));

      var functionScore = {
        "function_score": {
          "functions": functions,
          "boost_mode": "multiply"
        }
      };
      var query = {
        "size": 50,
        "query": {
          "bool": {
            "filter": [
              // take now date, remove 6 Month from it, the round it to the nearest day
              // the date should be greater then result date
              {"range": {"date": {"gte": "now-6M/d"}}}
            ],
            "must": [functionScore]
          }
        },
        "aggregations": {
          "tags": {
            "terms": {
              "field": "tags",
              "size": 3
            }
          }
        }
      };

      resolve(query);
    });
  });
};
