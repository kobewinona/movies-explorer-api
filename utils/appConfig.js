require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  DB_HOST = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET,
} = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'SECRET';

module.exports = { PORT, DB_HOST, SECRET };
