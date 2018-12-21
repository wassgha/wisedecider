Object.keys(process.env).forEach(key => {
  module.exports['process.env.' + key] = process.env[key]
})
