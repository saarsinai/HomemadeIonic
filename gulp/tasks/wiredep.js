'use strict';

import {stream as wiredep} from 'wiredep';

export default gulp => {
  gulp.task('wiredep', () => {
    gulp.src('www/index.html')
      .pipe(wiredep())
      .pipe(gulp.dest('www'));
  });
};
