/**
 * Created by Tamir on 30/04/2016.
 */
export default (userInfo) => {
  return {
    "field_value_factor": {
      "field": "likes",
      "modifier": "ln1p",
      "missing": 1
    },
    "weight": 0.3
  };



  return [];
};
