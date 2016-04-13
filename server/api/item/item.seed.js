'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);
router.post('/', controller.create);

export default router;
