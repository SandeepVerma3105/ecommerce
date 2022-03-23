const { ObjectID } = require("bson")
const httpStatus = require("http-status")
const constents = require("../../constents/constent")
const { jwtToken } = require("../../utils/jwtToket")
const userModel = require("../../models/user")
const modelAdmin = require("../../models/userAdmin")

const errors = require("../../error/error")

const login = async(req, res) => {
    data = req.body
    getdata = await modelAdmin.findQuery(data)
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    } else if (getdata == 0) {

        res.status(httpStatus.UNAUTHORIZED).json({
            success: "failed",
            errorCode: httpStatus.UNAUTHORIZED,
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
    getdata = await userModel.findQuery(data)
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            code: httpStatus.OK,
            data: getdata
        })
    }
}

const createUser = async(req, res, next) => {
    data = req.item

    getdata = await userModel.findQuery({ email: data.email })
    if (getdata.length > 0) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            error: errors.conflict.status,
            message: constents.emailExist,
        })
    } else {
        let getdata = await userModel.insertQuery(data)
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