require('dotenv').config();
import app from './app';

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log('Server running at port %d | MODE: %s', port, app.get('env'))
);

export default server;