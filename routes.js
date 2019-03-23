const routes = (module.exports = require('next-routes')())

routes.add('index', '/', 'index')
routes.add('homepage', '/homepage', 'homepage')
routes.add('new-worksheet', '/worksheet', 'worksheet')
routes.add('worksheet', '/worksheet/:id', 'worksheet')
