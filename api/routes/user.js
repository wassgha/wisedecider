const passport = require('passport')
const User = require('../models/user')

module.exports = function(server) {
  server.post('/api/register', (req, res, next) => {
    console.log('Registering user')
    User.register(new User({ email: req.body.email }), req.body.password, err => {
      if (err) {
        console.error('Error while registering user', err)
        return next(err)
      }

      console.log('User registered')

      res.redirect('/')
    })
  })

  server.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/')
  })

  server.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
