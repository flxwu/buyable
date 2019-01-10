import { Router } from 'express';

const router: Router = Router();

import { GroupController, GroupItemsController } from './groupController';

/**
 * POST New Product
 */
const groupController = new GroupController();
const groupItemsController = new GroupItemsController();

router.post('/new', groupController.newPOST);
router.get('/', groupController.get);
router.patch('/', groupController.update);
router.get('/items', groupItemsController.GET);

export default router;
