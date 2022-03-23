const { ObjectID } = require("bson")
const productModel = require("../../models/products")
const httpStatus = require("http-status")
const constents = require("../../constents/constent")

const paymentModel = require("../../models/payment")
const userModel = require("../../models/user")
const modelAdmin = require("../../models/userAdmin")
const bcrypt = require("bcrypt")
const errors = require("../../error/error")
const { jwtToken, parseJwt } = require("../../utils/jwtToket")


/*----------------------------------------------user---------------------------------------------------------------*/

const userReg = async(req, res, next) => {
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
                status: httpStatus.OK + constents.registerUser,
                message: constents.registerUser
            })
        }

    }
}

const userLogin = async(req, res) => {
    data = req.body
    getdata = await userModel.findQuery({ email: data.userName })
    if (getdata.error) {
        next(errors.internalError)
    } else if (getdata == 0) {
        res.status(httpStatus.UNAUTHORIZED).json({
            success: "failed",
            error: errors.unAuthorized.status,
            message: constents.invalidCrad
        })
    } else {
        let token = jwtToken(getdata.email, "vendor")
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + constents.logIn,
            data: { email: getdata.email, token: token }
        })
    }
}
const userDetail = async(req, res, next) => {
    data = req.body
    getdata = await userModel.findQuery(data)
    if (getdata.error) {
        res.status(httpStatus.OK).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + " OK",
            data: getdata
        })
    }

}
const updateuser = async(req, res, next) => {
    data = req.item
    qury = req.params.id
    try {
        getdata = await userModel.updateQuery(ObjectID(qury), data)
        if (getdata.error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: errors.internalError.status,
                message: constents.internalServerError
            })
        }
        if (getdata == 0) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                error: errors.dataNotFound.status,
                message: constents.idNotExist
            })
        } else {
            res.status(httpStatus.OK).json({
                success: true,
                status: httpStatus.OK,
                message: constents.updateUser
            })
        }
    } catch (err) {
        next(err)
    }

}
const deleteuser = async(req, res, next) => {
    data = req.params.id
    getdata = await userModel.deleteQuery({ _id: ObjectID(data) })
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    }
    if (getdata == 0) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            error: errors.dataNotFound.status,
            message: constents.idNotExist
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK,
            message: constents.deleteUser
        })
    }
}


const findAllDetail = async(req, res, next) => {
    data = req.body
    getdata = await userModel.findAllDetail(data)
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
            data: getdata
        })
    }
}

/*----------------------------------------------------payment------------------------------------------------------*/

const paymentDetail = async(req, res, next) => {
    data = req.item
    getUserData = await userModel.findQuery({ email: data.email })
    if (getUserData.length > 0) {
        getCardData = await paymentModel.findQuery({ cardNo: data.cardNo })
        if (getCardData.length > 0) {
            res.status(httpStatus.CONFLICT).json({
                success: false,
                errorCode: errors.conflict.status,
                message: constents.cardExists
            })
        } else {
            let getdata = await paymentModel.insertQuery(data)
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
                    message: constents.paymentDetail,
                    data: {
                        email: getdata[0].email,
                        key: getdata[0].paymentKey
                    }
                })
            }
        }
    } else {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            ok: httpStatus.BAD_REQUEST,
            message: constents.notExist
        })
    }
}

const paymentList = async(req, res, next) => {
    data = req.body
    getdata = await paymentModel.findQuery(data)
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
            data: getdata
        })
    }
}

const updatepayment = async(req, res, next) => {
    data = req.body
    qury = req.params.id
    getdata = await paymentModel.updateQuery(ObjectID(qury), data)
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    }
    if (getdata == 0) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            error: errors.dataNotFound.status,
            message: constents.idNotExist
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + " OK",
            message: constents.updatepayment
        })
    }
}

const deletepayment = async(req, res, next) => {
    data = req.params.id
    getdata = await paymentModel.deleteQuery({ _id: ObjectID(data) })
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    }
    if (getdata == 0) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            error: errors.dataNotFound.status,
            message: constents.idNotExist
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + 'OK',

            message: constents.deletepayment
        })
    }
}

//*------------------------------------------------products------------------------------------------------*//

const addProduct = async(req, res, next) => {
    data = req.item
    console.log(data)
    let getVendor = userModel.findQuery({ _id: ObjectID(data.vendorId) })
    if (getVendor.length > 0) {
        let getdata = await productModel.insertQuery(data)
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
                message: constents.addproduct
            })
        }
    } else {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            status: errors.dataNotFound.status,
            message: constents.vendorNotExit
        })
    }

}

const productList = async(req, res, next) => {
    data = req.body
    if (data.productId) {
        data = { _id: ObjectID(data.productId) }
    }
    getdata = await productModel.findQuery(data)
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
            message: constents.productList,
            data: getdata
        })
    }
}

const updateProduct = async(req, res, next) => {
    data = req.body
    qury = req.params.id
    console.log(req.body)
    getdata = await productModel.updateQuery(ObjectID(qury), data)
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    }
    if (getdata == 0) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            error: errors.dataNotFound.status,
            message: constents.idNotExist
        })
    } else {
        console.log(getdata)
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + " OK",
            message: constents.updateproduct
        })
    }
}

const deleteProduct = async(req, res, next) => {
    data = req.params.id
    getdata = await productModel.deleteQuery({ _id: ObjectID(data) })
    if (getdata.error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: errors.internalError.status,
            message: constents.internalServerError
        })
    }
    if (getdata == 0) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            error: errors.dataNotFound.status,
            message: constents.idNotExist
        })
    } else {
        res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK + " OK",
            message: constents.deleteproduct
        })
    }
}

module.exports = {
    userReg,
    userLogin,
    userDetail,
    updateuser,
    deleteuser,
    findAllDetail,
    addProduct,
    productList,
    updateProduct,
    deleteProduct,
    paymentDetail,
    paymentList,
    updatepayment,
    deletepayment,


}