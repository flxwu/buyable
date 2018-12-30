import { Router } from 'express';

const router: Router = Router();
import Controller from './groupController';
/**
 * POST New Product
 */
const groupController = new Controller();

router.post('/new', groupController.newPOST);
router.get('/', groupController.get);
router.patch('/', groupController.update);

export default router;
