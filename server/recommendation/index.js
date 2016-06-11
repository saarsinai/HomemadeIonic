import elastic from 'elasticSearch';
import initElastic from './init-elastic';
import recommend from './recommend';
import sellerRecommend from './seller-recommend';
import purchasesData from './purchases-data';

export default {
  recommend: recommend,
  sellerRecommend: sellerRecommend,
  purchasesData: purchasesData,
  initElastic: initElastic
}
