'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';

const router = new AsyncRouter();

router.get('/', controller.index);
//router.get('/:id', controller.show)

export default router;
