// Other Error Handlers
const errorHandler = (err, req ,res, next) => {
  console.error('\n\nError Handler, before Express default error handler\n\n')
  console.error(err)

  switch (err.constructor.name) {
    case 'NotGetWithHTTP':
      res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message,
        }
      })
      break;
  
    default:
      console.error('\n\nExpress default error handler\n\n')
      next(err)
      break;
  }
}

module.exports = {
  errorHandler
}