const mongooseCrudify = require('mongoose-crudify')

const helpers = require('../services/helpers')
const Worksheet = require('../models/worksheet')

module.exports = function(server) {
  // Docs: https://github.com/ryo718/mongoose-crudify
  server.use(
    '/api/worksheet',
    mongooseCrudify({
      Model: Worksheet,
      selectFields: '-__v', // Hide '__v' property
      endResponseInAction: false,

      afterActions: [{ middlewares: [helpers.formatResponse] }]
    })
  )
}
