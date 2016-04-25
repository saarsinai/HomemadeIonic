'use strict';

import runSequence from 'run-sequence';

export default gulp => {
  gulp.task('serve', cb => {
    runSequence(
      'clean:tmp',
      'less',
      'inject:css',
      'inject:js',
      'wiredep',
      'livereload',
      'nodemon',
      'open',
      'watch',
      cb);
  });

  gulp.task('serve:server', cb => {
    runSequence(
      'clean:tmp',
      'less',
      'inject:css',
      'inject:js',
      'wiredep',
      'livereload',
      'nodemon',
      'watch',
      cb);
  });

  gulp.task('serve:client', cb => {
    runSequence(
      'clean:tmp',
      'less',
      'inject:css',
      'inject:js',
      'wiredep',
      'livereload',
      'run',
      'watch',
      cb);
  });
};
