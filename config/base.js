switch (process.env.NODE_ENV) {
  case 'staging':
    module.exports = require('./stag')
    break;

  default:
    module.exports = require('./dev')
    break;
}