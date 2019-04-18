import shortid from 'shortid';

export const validateEmail = (email: String) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const uploadImages = async (s3, keyPrefix, images) => {
  try {
    const files = [];
    for (let i = 0; i < images.length; i++) {
      const fileObj = {
        Key: `${keyPrefix}-${shortid.generate() + shortid.generate()}`,
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
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
