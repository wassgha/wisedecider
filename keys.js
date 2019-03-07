const dotenv = process.env.NODE_ENV !== 'PROD' ? require('dotenv').config() : {}

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

module.exports = {
  ENVIRON,
  PORT,
  SERVER_HOST,
  MONGODB_URI
}
