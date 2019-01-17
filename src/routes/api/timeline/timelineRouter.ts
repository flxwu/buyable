import { Router } from 'express';

const router: Router = Router();
import Controller from './timelineController';

const timelineController = new Controller();

router.get('/latest', timelineController.latestGET);

export default router;
