import { Router } from 'express';

import itemRouter from './item/itemRouter';
import userRouter from './user/userRouter';
import groupRouter from './group/groupRouter';
import authRouter from './authRouter';
import experimentalRouter from './experimentalRouter';

const router: Router = Router();

router.use('/item', itemRouter);
router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/auth', authRouter);

router.use('/beta', experimentalRouter);

router.use('/', (req: any, res: any) => {
  res.status(400);
  res.send('This api route is not implemented yet.');
});

export default router;
