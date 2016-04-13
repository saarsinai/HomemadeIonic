'use strict';

import createError from 'http-errors';

// inject:route-imports
import itemRoute from '../api/item';
//import managerRoute from '../api/manager';
//import schoolRoute from '../api/school';

//import authRoute from '../../auth';

export default app => {
  // inject:route-usage
  app.use('/api/item', itemRoute);
  //app.use('/api/managers', managerRoute);
  //app.use('/api/schools', schoolRoute);

  //app.use('/auth', authRoute);

  // All undefined api routes should return a 404
  app.route('/:url(api)/*')
    .get((req, res, next) => {
      next(createError(404));
    });
};
