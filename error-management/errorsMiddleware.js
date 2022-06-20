const httpStatus = require("http-status-codes")

function mylog(err){
  // Logger only for custom errors
  console.error('\n\nError Handler, before Express default error handler\n\n')
  console.error(err)
}

// Other Error Handlers
const errorHandler = (err, req ,res, next) => {
  
  switch (err.constructor.name) {
    case 'NotGetWithHTTP':
      mylog(err)
      res.status(err.statusCode).json({
        SRV: {
          type: err.type,
          message: err.message,
        }
      })
      break;
    case 'CurrentlySavingNotWorkingFromServer':
      mylog(err)
      res.status(err.statusCode).json({
        SRV: {
          type: err.type,
          message: err.message,
        }
      })
      break;
    case 'DecyOpDenied':
      mylog(err)
      res.status(err.statusCode).json({
        SRV: {
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