import { Router } from 'express';

const router = Router();

router.get('/check', (req: any, res: any) => {
	const user = req.session.user;

	if (user && user._id) {
		res.status(200).json({ loggedIn: true })
	} else {
		res.status(200).json({ loggedIn: false })
	}
});

router.use('/login', (req: any, res: any) => {
  //TODO: store profile into session
});

router.use('/logout', (req: any, res: any) => {
  req.session.profile = {};
  res.status(200);
  res.send('Successfully logged out');
});

export default router;
