'use strict';

var exec = require('child_process').exec;

export default gulp => {
  gulp.task('open', () => {
    exec(`ionic serve --lab`);
  });
};
