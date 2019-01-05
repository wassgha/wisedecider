const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const glob = require('glob')

const next = require('next')
const app = next({ dev: process.env.ENVIRON !== 'prod' })
const routes = require('./routes')
const handler = routes.getRequestHandler(app)

const Constants = require('./constants')

app.prepare().then(() => {
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }))
  // Parse application/json
  server.use(bodyParser.json())

  // Allows for cross origin domain request:
  server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  // MongoDB
  mongoose.Promise = Promise
  mongoose.connect(Constants.MONGODB_URI)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))

  // API routes
  const rootPath = require('path').normalize(__dirname)
  glob
    .sync(rootPath + '/api/routes/*.js')
    .forEach(controllerPath => require(controllerPath)(server))

  // Next.js request handling
  const customRequestHandler = (page, req, res) => {
    // Both query and params will be available in getInitialProps({query})
    const mergedQuery = Object.assign({}, req.query, req.params)
    app.render(req, res, page, mergedQuery)
  }

  // Routes
  //server.get('/custom', customRequestHandler.bind(undefined, '/custom-page'));
  server.get('/', customRequestHandler.bind(undefined, '/'))
  server.get('*', handler)

  server.listen(Constants.PORT, function() {
    console.log(
      `App running on http://localhost:${Constants.PORT}/\nAPI running on http://localhost:${
        Constants.PORT
      }/api/`
    )
  })
})
