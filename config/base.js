console.log("what environtment?: ", process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'staging':
    module.exports = require('./stag')
    break;

  default:
    module.exports = require('./dev')
    break;
}