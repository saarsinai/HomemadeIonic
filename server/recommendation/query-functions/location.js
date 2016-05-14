/**
 * Created by Tamir on 30/04/2016.
 */
export default (userInfo) => {
  return {
    "gauss": {
      "location": {
        "origin": userInfo.location,
        "offset": "1.5km",
        "scale":  "1km"
      }
    },
    "weight": 1
  };

  return [];
}

