require('dotenv').config();
import https from 'https';
import fs from 'fs';

const privateKey = fs.readFileSync('localhost-certificate-key.pem');
const certificate = fs.readFileSync('localhost-certificate.pem');

import app from './app';

const port = process.env.PORT || 5000;

const server = https
  .createServer(
    {
      key: privateKey,
      cert: certificate
    },
    app
  )
  .listen(port, () =>
    console.log('Server running at port %d | MODE: %s', port, app.get('env'))
  );

export default server;
