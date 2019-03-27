const dotenv = process.env.ENVIRON !== 'PROD' ? require('dotenv').config() : { parsed: {} }

if (dotenv.error) {
  throw dotenv.error
}

const PORT = process.env.PORT || dotenv.parsed.PORT || 3001
const ENVIRON = process.env.ENVIRON || dotenv.parsed.ENVIRON || 'DEV'
const SERVER_HOST =
  process.env.SERVER_HOST ||
  dotenv.parsed.SERVER_HOST ||
  (ENVIRON == 'DEV' ? `http://localhost:${PORT}/` : `https://wisedecider.herokuapp.com/`)
const MONGODB_URI =
  process.env.MONGODB_URI ||
  dotenv.parsed.MONGODB_URI ||
  `mongodb://localhost/nextjs-express-boilerplate`
const SESSION_SECRET = process.env.SESSION_SECRET || dotenv.parsed.SESSION_SECRET

module.exports = {
  ENVIRON,
  PORT,
  SERVER_HOST,
  MONGODB_URI,
  SESSION_SECRET
}
