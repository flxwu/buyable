require('dotenv').config();
import https from 'https';
import http from 'http';
import fs from 'fs';

const privateKey = fs.readFileSync('localhost-certificate-key.pem');
const certificate = fs.readFileSync('localhost-certificate.pem');
const useHttps = Number(process.env.HTTPS) ? true : false;

import configureApp from './app';
let server: https.Server | http.Server;
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
            '\x1b[36m%s\x1b[0m',
            `Server running at port ${port} | MODE: ${app.get('env')} |`
          )
        )
    : http
        .createServer(app)
        .listen(port, () =>
          console.log(
            '\x1b[36m%s\x1b[0m',
            `Server running at port ${port} | MODE: ${app.get('env')} |`,
            '\x1b[31mWARNING: HTTPS DISABLED\x1b[0m'
          )
        );
};
startServer();

export default server;
