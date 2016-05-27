import elastic from 'elasticSearch';
import initElastic from './init-elastic.js';
import recommend from './recommend.js';
import sellerRecommend from './seller-recommend.js';

export default {
  recommend: recommend,
  sellerRecommend: sellerRecommend,
  initElastic: initElastic
}
