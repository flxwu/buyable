import { Router } from 'express';
import { isUserDuplicate } from '../../helpers/database';

/**
 * EXPERIMENTAL ROUTER FOR TESTING OUT STUFF
 */

const router: Router = Router();

router.get('/user/duplicate', async (req, res, next) => {
  res.json(await isUserDuplicate('apiTest1'));
});

export default router;
