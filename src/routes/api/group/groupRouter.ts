import { Router } from 'express';

const router: Router = Router();

import { GroupController, GroupItemsController } from './groupController';

const groupController = new GroupController();
const groupItemsController = new GroupItemsController();

router.post('/new', groupController.newPOST);
router.get('/', groupController.get);
router.patch('/', groupController.update);
router.get('/items', groupItemsController.GET);
router.post('/items/add', groupItemsController.addPOST);
export default router;
