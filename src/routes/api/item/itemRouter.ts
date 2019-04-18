import { Router } from 'express';

const router: Router = Router();
import Controller from './itemController';
/**
 * POST New Product
 */
let s3;
const itemController = new Controller();

router.post('/new', (req, res, next) =>
  itemController.newPOST(req, res, next, s3)
);
router.get('/', itemController.GET);

export default function(s3Ref) {
  s3 = s3Ref;
  return router;
}
