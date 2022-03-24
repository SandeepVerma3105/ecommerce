const { ObjectID } = require("bson")
const httpStatus = require("http-status")
const constents = require("../../constents/constent")
const { jwtToken } = require("../../utils/jwtToket")
const dataServices = require("../../models/dataServices")
const errors = require("../../error/error")
const randPassword = require("../../utils/randamKey")
const login = async(req, res) => {
    data = req.body
    getdata = await dataServices.findQuery("userAdmin", { email: data.userName, password: data.password })
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    } else if (getdata == 0) {

        res.status(httpStatus.UNAUTHORIZED).json({
            success: "failed",
            error: errors.unAuthorized.status,
            message: constents.invalidCrad
        })
    } else {
        let token = jwtToken(getdata.email, "admin")
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + " OK",
            data: {
                name: getdata[0].name,
                email: getdata[0].email,
                token: token
            }
        })
    }
}
const userList = async(req, res, next) => {
    data = req.body
    getdata = await dataServices.findQuery("user", data)
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + " OK",
            message: constents.userList,
            data: getdata
        })
    }
}

const createUser = async(req, res, next) => {
    data = req.item
    pass = await randPassword.random_key()
    getdata = await dataServices.findQuery("user", { email: data.email })
    if (getdata.length > 0) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            error: errors.conflict.status,
            message: constents.emailExist,
        })
    } else {
        let getdata = await dataServices.insertQuery("user", {
            firstName: data.firstName || "null",
            lastName: data.lastName || "null",
            email: data.email,
            fatherName: data.fatherName || "null",
            countryCode: data.countryCode || "null",
            mobile: data.mobile || 0,
            address: data.address || "null",
            password: pass
        })
        if (getdata.error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: errors.internalError.status,
                message: constents.internalServerError
            })
        } else {
            res.status(httpStatus.OK).json({
                success: true,
                status: httpStatus.OK,
                message: constents.registerUser,
                data: {
                    username: getdata[0].email,
                    password: getdata[0].password
                }
            })
        }

    }
}

module.exports = {
    login,
    userList,
    createUser
}