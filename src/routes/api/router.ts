import express, { Router } from 'express';
const router: Router = Router();
router.use('/', (req: any, res: any) => {
    res.status(200);
    res.json('This is the api');
});

export default router;