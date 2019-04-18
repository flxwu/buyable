import { Router } from 'express';
import shortid from 'shortid';

import itemRouter from './item/itemRouter';
import userRouter from './user/userRouter';
import groupRouter from './group/groupRouter';

import timelineRouter from './timeline/timelineRouter';

import authRouter from './authRouter';
import experimentalRouter from './experimentalRouter';

const router: Router = Router();

let s3;

router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/timeline', timelineRouter);

// only for testing purposes, for production code s. helpers/api.ts
router.post('/image', async (req, res, next) => {
  const { owner, images } = req.body;
  try {
    const files = [];
    for (let i = 0; i < images.length; i++) {
      const fileObj = {
        Key: `${owner._id}-${shortid.generate() + shortid.generate()}`,
        Body: new Buffer(images[i], 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL: 'public-read'
      };
      files.push(fileObj);
    }
    try {
      await Promise.all(
        files.map(async fileObj => await s3.upload(fileObj).promise())
      );
      res.send('Uploaded');
    } catch (err) {
      res.send(err.stack);
    }
  } catch (err) {
    console.error(err);
    res.send('Error while uploading product images');
  }
});

router.use('/auth', authRouter);

router.use('/beta', experimentalRouter);

export default function(s3Ref) {
  s3 = s3Ref;
  router.use('/item', itemRouter(s3));
  router.use('/', (req: any, res: any) => {
    res.status(400);
    res.send('This api route is not implemented yet.');
  });
  return router;
}
