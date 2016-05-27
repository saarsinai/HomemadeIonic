/**
 * Created by Tamir on 30/04/2016.
 */
export default (sellerInfo) => {
  return {
    "linear": {
      "date": {
        "origin": "now",
        "scale":  "5d",
        "decay": 0.5
      }
    },
    "weight": 1
  };

  return [];
}

