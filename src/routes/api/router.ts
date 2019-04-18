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

const uploadLoadToS3 = (s3, fileObj) => s3.upload(fileObj).promise();

router.use('/item', itemRouter);
router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/timeline', timelineRouter);

router.post('/image', (req, res, next) => {
  const { owner, images } = req.body;
  try {
    const promises = [];
    for (const b64Image of images) {
      const fileObj = {
        Key: `${owner._id}-${shortid.generate() + shortid.generate()}`,
        Body: new Buffer(b64Image, 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
      promises.push(uploadLoadToS3(s3, fileObj));
    }
    Promise.all(promises)
      .then(function(data) {
        res.send('Uploaded');
      })
      .catch(function(err) {
        res.send(err.stack);
      });
  } catch (err) {
    console.error(err);
    res.send('Error while uploading product images');
  }
});

router.use('/auth', authRouter);

router.use('/beta', experimentalRouter);

router.use('/', (req: any, res: any) => {
  res.status(400);
  res.send('This api route is not implemented yet.');
});

export default function(s3Ref) {
  s3 = s3Ref;
  return router;
}
