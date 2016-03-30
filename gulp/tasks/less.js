'use strict';

import less from 'gulp-less';

export default gulp => {
  gulp.task('less', ['inject:less'], () => {
    return gulp.src('www/app/app.less')
      .pipe(less({
        paths: [
          'www/bower_components',
          'www/app',
          'www/components'
        ]
      }))
      .pipe(gulp.dest('www/.tmp'));
  });
};