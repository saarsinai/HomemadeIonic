/**
 * Created by Tamir on 30/04/2016.
 */
export default (userInfo) => {
  return {
    "field_value_factor": {
      "field": "likes",
      "modifier": "log1p"
    },
    "weight": 0.6
}};
