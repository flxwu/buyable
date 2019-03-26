require('dotenv').config();
import https from 'https';
import http from 'http';
import fs from 'fs';

const privateKey = fs.readFileSync('localhost-certificate-key.pem');
const certificate = fs.readFileSync('localhost-certificate.pem');
const useHttps = Number(process.env.HTTPS) ? true : false;

import configureApp from './app';
let server;
const port = process.env.PORT || 5000;
const startServer = async () => {
  const app = await configureApp();
  server = useHttps
    ? https
        .createServer(
          {
            key: privateKey,
            cert: certificate
          },
          app
        )
        .listen(port, () =>
          console.log(
            'Server running at port %d | MODE: %s',
            port,
            app.get('env')
          )
        )
    : http
        .createServer(app)
        .listen(port, () =>
          console.log(
            'Server running at port %d | MODE: %s',
            port,
            app.get('env'),
            '\nWARNING: HTTPS DISABLED'
          )
        );
};
startServer();

export default server;
