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

class CurrentlySavingNotWorkingFromServer extends CustomError {
  constructor(){
    super()
    this.type = this.constructor.name
    this.message = ['Cannot save content. Error is server side. Our maintainers will fix it as soon as possible.']
  }
}

class DecyOpDenied extends CustomError {
  constructor(){
    super()
    this.statusCode = httpStatus.StatusCodes.FORBIDDEN
    this.type = this.constructor.name
    this.message = ['You do not have the permissions to execute this request']
  }
}



module.exports = {
  NotGetWithHTTP,
  CurrentlySavingNotWorkingFromServer,
  DecyOpDenied
}