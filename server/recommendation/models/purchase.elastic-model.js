import elastic from 'elasticSearch';

var client = new elastic.Client({
  host: process.env.ELASTIC_URI,
  //log: 'trace'
});

var index = process.env.ELASTIC_INDEX;
var type = 'purchases';
var logError = (err) => console.error(JSON.stringify(err));

export function addPurchase(id, tags, location, date){
  return client.index({
    index: index,
    type: type,
    id: id.toString(),
    body: {
      tags: tags,
      location: location,
      date: date
    }
  });
}

