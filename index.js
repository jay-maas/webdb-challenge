require('dotenv').config()

const helmet = require('helmet')
const server = require('./api/server.js');

server.use(helmet())

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});