import { Router } from 'express';

const router: Router = Router();
import Controller from './itemController';
/**
 * POST New Product
 */

const itemController = new Controller();

router.post('/new', itemController.newPost);
router.get('/', itemController.get);
export default router;