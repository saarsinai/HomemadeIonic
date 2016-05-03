'use strict';

import inject from 'gulp-inject';
import config from '../config';

export default gulp => {
  gulp.task('inject:less', () => {
    return gulp.src('www/app/app.less')
      .pipe(inject(gulp.src(config.paths.client.less, {read: false}), {
        transform: filePath => {
          filePath = filePath.replace('/www/app/', '');
          filePath = filePath.replace('/www/components/', '');
          return `@import '${filePath}';`;
        },
        starttag: '// injector',
        endtag: '// endinjector'
      }))
      .pipe(gulp.dest('www/app'));
  });

  gulp.task('inject:css', () => {
    return gulp.src('www/index.html')
      .pipe(inject(gulp.src(config.paths.client.css, {read: false}), {
        transform: filePath => {
          filePath = filePath.replace('/www/', '');
          filePath = filePath.replace('/.tmp/', '');
          return `<link rel="stylesheet" href="${filePath}">`;
        },
        starttag: '<!-- injector:css -->',
        endtag: '<!-- endinjector -->'
      }))
      .pipe(gulp.dest('www'));
  });

  gulp.task('inject:js', () => {
    return gulp.src('www/index.html')
      .pipe(inject(gulp.src(config.paths.client.js, {read: false}), {
        transform: filePath => {
          filePath = filePath.replace('/www/', '');
          return `<script src="${filePath}"></script>`;
        },
        starttag: '<!-- injector:js -->',
        endtag: '<!-- endinjector -->'
      }))
      .pipe(gulp.dest('www'));
  });
};
