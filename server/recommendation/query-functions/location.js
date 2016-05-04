/**
 * Created by Tamir on 30/04/2016.
 */
export default (userInfo) => {
  return {
    "gauss": {
      "location": {
        "origin": userInfo.location,
        "offset": "30km",
        "scale":  "10km"
      }
    },
    "weight": 1
  };
}

