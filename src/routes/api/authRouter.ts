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

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('logging in');
  const filteredUser = JSON.parse(JSON.stringify(req.user));
  delete filteredUser.password;
  res.status(200).json(filteredUser);
});

router.get('/logout', (req: any, res: any) => {
  console.log('logging out');
  req.logout();
  res.status(200).json({ message: 'logged out' });
});

export default router;
