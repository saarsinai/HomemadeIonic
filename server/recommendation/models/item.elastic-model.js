import elastic from 'elasticSearch';

var client = new elastic.Client({
  host: process.env.ELASTIC_URI,
  //log: 'trace'
});

var index = process.env.ELASTIC_INDEX;
var type = 'items';
var logError = (err) => console.error(JSON.stringify(err));

export function addItem(id, name, tags, likes, location){
    return client.index({
      index: index,
      type: type,
      id: id.toString(),
      body: {
        name: name,
        tags: tags,
        likes: likes.length,
        location: location,
        active: false
      }
    });
}
export function removeItem(id){
  return client.delete({
    index: index,
    type: type,
    id: id.toString()
  });
}
export function updateItemsLocation(ids, location){
  var body = [];
  ids.forEach(id => {
    body.push({update: {_id: id.toString()}});
    body.push({
      doc: {
        location: location
      }
    });
  });
  return client.bulk({
    index: index,
    type: type,
    body: body
  });
}
export function updateItemDetails(id, name, tags, likes){
    return client.update({
    index: index,
    type: type,
    id: id.toString(),
    body: {
      doc: {
        name: name,
        tags: tags,
        likes: likes.length
      }
    }
  });
}
export function updateItemActiveness(id, active){
    return client.update({
    index: index,
    type: type,
    id: id.toString(),
    body: {
      doc: {
        active: active
      }
    }
  });
}
