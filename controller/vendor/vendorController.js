const { ObjectID } = require("bson")
const productModel = require("../../models/products")
const httpStatus = require("http-status")
const constents = require("../../constents/constent")
const bcrypt = require("bcrypt")
const errors = require("../../error/error")
const { jwtToken, parseJwt } = require("../../utils/jwtToket")
const key = require("../../utils/randamKey")

/***********************************************user******************************************************************/

const userReg = async(req, res, next) => {
    data = req.item

    getdata = await dataServices.findQuery("user", { email: data.email })
    if (getdata.length > 0) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            error: errors.conflict.status,
            message: constents.emailExist,
        })
    } else {
        let getdata = await dataServices.insertQuery("user", {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            fatherName: data.fatherName,
            countryCode: data.countryCode,
            mobile: data.mobile,
            address: data.address,
            password: data.password
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
                status: httpStatus.OK + constents.registerUser,
                message: constents.registerUser
            })
        }
    }
}

const userLogin = async(req, res) => {
    data = req.body
    getdata = await dataServices.findQuery("user", { email: data.userName })
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
    getdata = await dataServices.findQuery("user", data)
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
        getdata = await dataServices.updateQuery("user", ObjectID(qury), data)
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
    getdata = await dataServices.deleteQuery("user", { _id: ObjectID(data) })
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
    getdata = await dataServices.findAllDetail("user", data)
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
    getUserData = await dataServices.findQuery("user", { email: data.email })
    if (getUserData.length > 0) {
        getCardData = await dataServices.findQuery("payment", { cardNo: data.cardNo })
        if (getCardData.length > 0) {
            res.status(httpStatus.CONFLICT).json({
                success: false,
                errorCode: errors.conflict.status,
                message: constents.cardExists
            })
        } else {
            paymentKey = await key.random_key()
            let getdata = await dataServices.insertQuery("payment", {
                email: data.email,
                cardNo: data.cardNo,
                cardName: data.cardName,
                cardHolderName: data.cardHolderName,
                cvvNo: data.cvvNo,
                expDate: data.expDate,
                paymentKey: paymentKey,
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
                    status: httpStatus.OK + " OK",
                    message: constents.paymentDetail,
                    data: {
                        email: getdata
                    }
                })
            }
        }
    } else {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            status: errors.badRequest.status,
            message: constents.notExist
        })
    }
}

const paymentList = async(req, res, next) => {
    data = req.body
    getdata = await dataServices.findQuery("payment", data)
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
    getdata = await dataServices.updateQuery("payment", ObjectID(qury), data)
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
    getdata = await dataServices.deleteQuery("payment", { _id: ObjectID(data) })
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
    console.log(data.vendorId)
    let getVendor = await dataServices.findQuery("user", { _id: ObjectID(data.vendorId) })
    if (getVendor.length > 0) {
        let getdata = await dataServices.insertQuery("product", {
            name: data.name,
            price: data.price,
            currency: data.currency,
            description: data.description,
            quantity: data.quantity,
            category: data.category,
            vendorId: data.vendorId,
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
const dataServices = require("../../models/dataServices")
const productList = async(req, res, next) => {
    data = req.body
    if (data.productId) {
        data = { _id: ObjectID(data.productId) }
    }
    getdata = await dataServices.findQuery("product", data)
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
    getdata = await dataServices.updateQuery("product", ObjectID(qury), data)
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
            message: constents.updateproduct
        })
    }
}

const deleteProduct = async(req, res, next) => {
    data = req.params.id
    getdata = await dataServices.deleteQuery("product", { _id: ObjectID(data) })
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