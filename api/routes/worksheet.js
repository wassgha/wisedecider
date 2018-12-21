import mongooseCrudify from 'mongoose-crudify'

import helpers from '../services/helpers'
import Worksheet from '../models/worksheet'

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
