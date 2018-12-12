import { Router } from 'express';

import ProductRouter from './product';

const router: Router = Router();
router.use('/', (req: any, res: any) => {
    res.status(200);
    res.json('This is the api');
});

router.use('/product', ProductRouter);

export default router;