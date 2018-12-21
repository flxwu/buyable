import { Router } from 'express';
import { validateEmail } from '../../helpers/api';
import passport from 'passport';

const router = Router();

router.get('/check', (req: any, res: any) => {
  const user = req.user;

  if (user && user._id) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

router.post(
  '/login',
  passport.authenticate('local'),
  function(req, res) {
		res.status(200).send(req.user);
  }
);

router.get('/logout', (req: any, res: any) => {
	req.logout();
  res.redirect('/');
  res.send('Successfully logged out');
});

export default router;
