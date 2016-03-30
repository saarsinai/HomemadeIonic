'use strict';

import config from '../config';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';

const isFixed = file => file.eslint && file.eslint.fixed;

export default gulp => {
  gulp.task('eslint', ['eslint:server', 'eslint:gulp']);

  gulp.task('eslint:server', () => {
    return gulp.src(config.paths.server)
      .pipe(eslint({fix: true}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(gulpIf(isFixed, gulp.dest('server')));
  });

  gulp.task('eslint:gulp', () => {
    return gulp.src(config.paths.gulp, {base: '.'})
      .pipe(eslint({fix: true}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(gulpIf(isFixed, gulp.dest('.')));
  });
};