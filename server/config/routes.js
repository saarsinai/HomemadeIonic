'use strict';

import createError from 'http-errors';
import path from 'path';
import fs from 'fs';

export default app => {
  fs.readdirSync(path.join(__dirname, '../api')).forEach(module => {
    require('../api/' + module).default(app);
  });

  // All undefined api routes should return a 404
  app.route('/:url(api)/*')
    .get((req, res, next) => {
      next(createError(404));
    });
};
