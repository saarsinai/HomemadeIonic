import elastic from 'elasticSearch';
import initElastic from './init-elastic.js';
import recommend from './recommend.js';

export default {
  recommend: recommend,
  initElastic: initElastic
}
