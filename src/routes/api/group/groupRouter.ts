import { Router } from 'express';

const router: Router = Router();
import Controller from './groupController';
/**
 * POST New Product
 */
const groupController = new Controller();

router.post('/new', groupController.newPost);
router.get('/', groupController.get);

export default router;