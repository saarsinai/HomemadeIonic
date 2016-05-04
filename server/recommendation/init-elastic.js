import elastic from 'elasticsearch';

var client = new elastic.Client({
  host: process.env.ELASTIC_URI,
  //log: 'trace'
});

export default function () {
  var index = 'homemade';

  return client.indices.exists({index: index})
    .then((exists) => {
      if (exists) {
        return client.indices.delete({index: index});
      }
    })
    .then(() => client.indices.create({index: index}))
    .then(() => {
      return client.indices.putMapping({
        index: index,
        type: 'items',
        body: {
          "properties": {
            "location": {
              "type": "geo_point",
              "lat_lon": true
            },
            tags: {
              type: "string"
            },
            likes: {
              type: "long"
            },
            active: {
              type: "boolean"
            }
          }
        }
      });
    })
    .then(() => {
      // do another mapping
    });
};