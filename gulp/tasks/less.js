'use strict';

import less from 'gulp-less';

export default gulp => {
  gulp.task('less', ['inject:less'], () => {
    return gulp.src('www/app/style.less')
      .pipe(less({
        paths: [
          'www/bower_components',
          'www/app',
          'www/components',
          'www/lib'
        ]
      }))
      .pipe(gulp.dest('www/css'));
  });
};
