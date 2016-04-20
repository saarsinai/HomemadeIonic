'use strict';

import fs from 'fs';
import {join} from 'path';

module.exports =  plop => {
  fs.readdirSync('./plop')
    .filter(filename => fs.statSync(join('./plop', filename)).isDirectory())
    .forEach(folder => require(`./plop/${folder}`).default(plop));
};
