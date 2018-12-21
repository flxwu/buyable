import { Router } from 'express';

const router = Router();

router.use('/login', (req: any, res: any) => {
	//TODO: store profile into session
});

router.use('/logout', (req: any, res: any) => {
	req.session.profile = {};
	res.status(200);
	res.send('Successfully logged out');
});

export default router;