/**
 * Created by Tamir on 30/04/2016.
 */
export default (userInfo) => {
  return {
    "random_score": {
      "seed":  userInfo.id.toString()
    },
    "weight": 0.2
  };

  return [];
}
