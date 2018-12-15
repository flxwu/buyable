import { Router } from 'express';

const router: Router = Router();
import Controller from './userController';
/**
 * POST New Product
 */
const userController =  new Controller();

router.post('/new', userController.newPOST);

export default router;