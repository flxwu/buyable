import { Router } from 'express';
import SearchController from './searchController';
import router from '../authRouter';
const search = new SearchController();
router.get('/', search.GET);

export default router;
