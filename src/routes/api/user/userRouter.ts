import { Router } from 'express';

const router: Router = Router();
import Controller from './userController';

const userController = new Controller();

router.post('/new', userController.newPOST);

router.get('/', userController.GET);

router.patch('/', userController.PATCH);

router.get('/items', userController.itemsGET);

router.get('/groups', userController.groupsGET);
export default router;
