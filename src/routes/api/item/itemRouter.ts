import { Router } from 'express';

const router: Router = Router();
import Controller from './itemController';
import {
  newPOSTValidators,
  GETValidators,
  UPDATEValidators,
  DELETEValidators
} from './itemValidators';
/**
 * POST New Product
 */

const itemController = new Controller();

router.post('/new', newPOSTValidators, itemController.newPOST);
router.get('/', GETValidators, itemController.GET);
router.patch('/', UPDATEValidators, itemController.UPDATE);
router.delete('/', DELETEValidators, itemController.DELETE);

export default router;
