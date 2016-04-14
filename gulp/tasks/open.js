'use strict';

/*
import open from 'open';

export default gulp => {
  gulp.task('open', () => {
    open(`http://localhost:${process.env.PORT}`);
  });
};*/


var exec = require('child_process').exec;

export default gulp => {
  gulp.task('open', () => {
    exec(`ionic serve --lab`);
  });
};
