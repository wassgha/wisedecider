require('dotenv').config()

export const BLOCK = {
  TITLE: 'title',
  TEXT: 'text'
}

export const LOCAL_DB = 'nextjs-express-boilerplate'
export const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${LOCAL_DB}`
export const PORT = process.env.PORT || 3001
export const SERVER_HOST =
  process.env.SERVER_HOST || `https://wisedecider.herokuapp.com/` || `http://localhost:${PORT}/`
