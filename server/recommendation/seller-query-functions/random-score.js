/**
 * Created by Tamir on 30/04/2016.
 */
export default (sellerInfo) => {
  return {
    "random_score": {
      "seed":  sellerInfo.id.toString()
    },
    "weight": 0.2
  };

  return [];
}
