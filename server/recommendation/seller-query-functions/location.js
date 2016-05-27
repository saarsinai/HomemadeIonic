/**
 * Created by Tamir on 30/04/2016.
 */
export default (sellerInfo) => {
  return {
    "gauss": {
      "location": {
        "origin": sellerInfo.location,
        "offset": "1.5km",
        "scale":  "1km"
      }
    },
    "weight": 1
  };

  return [];
}

