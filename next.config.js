const Keys = require('./keys')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  env: {
    ENVIRON: Keys.ENVIRON,
    PORT: Keys.PORT,
    SERVER_HOST: Keys.SERVER_HOST
  }
})
