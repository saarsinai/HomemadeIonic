'use strict';

export default {
  paths: {
    client: {
      less: [
        'www/{app,components}/**/*.less',
        '!www/app/style.less'
      ],
      js: [
        'www/{app,components}/**/*.js',
        '!www/app/app.js'
      ],
      css: [
        'www/{app,components,lib,.tmp}/**/*.css'
      ],
      html: [
        'www/{app,components}/**/*.html'
      ]
    },
    server: ['server/**/*.js'],
    gulp: ['./gulpfile.js', './gulp/**/*.js']
  }
};
