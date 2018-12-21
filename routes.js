const routes = (module.exports = require('next-routes')())

routes.add('index', '/worksheet', 'index')
routes.add('worksheet', '/worksheet/:id', 'index')
