const httpStatus = require("http-status-codes")
let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR

class CustomError extends Error {
  constructor() {
    super()
    this.statusCode = errorCode
  }
}

// Kept as an example
// class SubCustomError extends CustomError {
//   constructor(){
//     super()
//   }
// }

// Used to test errorResponseDispatcher when the error is thrown at register-login-controllers.js in registerController function, when User.create errors' out
class NotGetWithHTTP extends CustomError {
  constructor(){
    super()
    this.type = this.constructor.name
    this.message = ['Cannot send requests with http protocol']
  }
}


module.exports = {
  NotGetWithHTTP
}