require('dotenv').config()
const httpStatus = require("http-status")
const jwt = require('jsonwebtoken');
const constent = require('../constents/constent');
const secretKey = process.env.SECRET_KEY
const errors = require('../error/error')
const jwtDecode = require("jwt-decode")

//verify token
function verifyToken(req, res, next) {
    let token = req.headers['accesstoken'];
    console.log("TCL: verifyToken -> token", token)
    if (!token) return res.status(httpStatus.UNAUTHORIZED).send({
        success: false,
        error: httpStatus.UNAUTHORIZED + " UNAUTHORIZED",
        message: "no token provided"
    });
    jwt.verify(token, secretKey, function(error, decoded) {
        if (error) {
            console.log('------------>Token ERROR', error);
            res.status(httpStatus.UNAUTHORIZED).send({
                success: false,
                error: httpStatus.UNAUTHORIZED + " UNAUTHORIZED",
                message: constent.tokenExpire
            })
        } else {
            req.data = {
                id: decoded.id,
                email: decoded.email,
                token: token
            }
            console.log('------------------>>token verified')
            next();
        }
    });
}

//valiation for vendor to access apis
function parseJwtVendor(req, res, next) {
    let token = req.headers['accesstoken']
        // console.log(token)
    const data = jwtDecode(token)
    console.log(data)
    if (data.role != "vendor" && data.role != "admin") {
        res.status(httpStatus.UNAUTHORIZED).send({
            success: false,
            error: httpStatus.UNAUTHORIZED + " UNAUTHORIZED",
            message: constent.vendorValidation

        })
    } else {
        next()
    }
}



//valiation for admin to access apis
function parseJwtAdmin(req, res, next) {
    let token = req.headers['accesstoken']
    const data = jwtDecode(token)
    if (data.role != "admin") {
        res.status(httpStatus.UNAUTHORIZED).send({
            success: false,
            error: httpStatus.UNAUTHORIZED + " UNAUTHORIZED",
            message: constent.adminValidation
        })
    } else {
        next()
    }
}

module.exports = {
    verifyToken,
    parseJwtVendor,
    parseJwtAdmin
}