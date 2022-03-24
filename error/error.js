const HttpStatus = require("http-status")

const internalError = new Error("Internal Error")
internalError.status = HttpStatus.INTERNAL_SERVER_ERROR

const dataNotFound = new Error("DataNotFound")
dataNotFound.status = HttpStatus.NOT_FOUND + " DATA_NOT_FOUND"

const unAuthorized = new Error("UnAuthorized")
unAuthorized.status = HttpStatus.UNAUTHORIZED + " UNAUTHORIZED"

const conflict = new Error("UnAuthorized")
conflict.status = HttpStatus.CONFLICT + " CONFLICT"

const badRequest = new Error("BAD_REQUEST")
badRequest.status = HttpStatus.BAD_REQUEST + " BAD_REQUEST"
module.exports = {
    internalError,
    dataNotFound,
    unAuthorized,
    conflict,
    badRequest
}