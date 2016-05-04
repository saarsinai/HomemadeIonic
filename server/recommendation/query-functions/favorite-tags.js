/**
 * Created by Tamir on 30/04/2016.
 */
export default (userInfo) => {
  if (!userInfo.tags || userInfo.tags.length === 0) {
    return [];
  }
  return userInfo.tags.map(tag => {
    return {
      "filter": { "term": { "tags": tag }},
      "weight": 1
    }
  });
}
