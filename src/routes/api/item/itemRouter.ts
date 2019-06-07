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
let s3;
const itemController = new Controller();

router.post('/new', newPOSTValidators, (req, res, next) =>
  itemController.newPOST(req, res, next, s3)
);

router.get('/', GETValidators, itemController.GET);
router.patch('/', UPDATEValidators, itemController.UPDATE);
router.delete('/', DELETEValidators, itemController.DELETE);


export default function(s3Ref) {
  s3 = s3Ref;
  return router;
}
