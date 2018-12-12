import { Router } from 'express';

const router: Router = Router();

/**
 * POST New Product
 */
router.post('/new', (req, res, next) => {
	const { user, product } = req.body;

	//TODO: Post to DB
});

export default router;