import elastic from 'elasticSearch';

export default function purchasesData(itemId) {
  console.logJson(itemId);
  return new Promise(function (resolve, reject) {
    buildQuery(itemId).then((query) => {
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
      var result = resp.aggregations.purchasesOfItems.monthOfPurchase.buckets.map(bucket => {
        var date = new Date(bucket.key);
        var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = date.getDate().toString();
        var dateStr = (dd[1]?dd:"0"+dd[0]) + '/' + (mm[1]?mm:"0"+mm[0]); // padding

        return {
          weekStart: dateStr,
          purchases: bucket.doc_count
        }
      });
      resolve(result);
    }, reject);
  });
};

var buildQuery = (itemId) => {
  return Promise.resolve({
    "size": 0,
    "aggs": {
      "purchasesOfItems": {
        "filter": {
          "term": {
            "item": itemId.toString()
          }
        },
        "aggs": {
          "monthOfPurchase": {
            "date_histogram": {
              "field": "date",
              "interval": "week",
              "offset": "-1d"
            }
          }
        }
      }
    }
  });
};
