'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './item.controller';

const router = new AsyncRouter();

router.get('/', controller.index);
router.post('/', controller.create);

export default router;
