const { ObjectID } = require("bson")
const userModel = require("../../models/user")
const httpStatus = require("http-status")
const bcrypt = require("bcrypt")
const errors = require("../../error/error")
const constents = require("../../constents/constent")

const userReg = async(req, res, next) => {
    data = req.item

    getdata = await userModel.findQuery({ email: data.email })
    if (getdata.length > 0) {
        res.status(httpStatus.CONFLICT).json({ message: "email allready exist " })
    } else {
        let getdata = await userModel.insertQuery(data)
        if (getdata.error) {
            next(errors.internalError)
        } else {
            res.status(httpStatus.OK).json(getdata)
        }

    }
}

const userList = async(req, res, next) => {
    data = req.body
    getdata = await userModel.findQuery(data)
    if (getdata.error) {
        next(errors.internalError)
    } else {
        res.status(httpStatus.OK).json(getdata)
    }

}
const updateuser = async(req, res, next) => {
    data = req.item
    qury = req.params.id
    try {
        getdata = await userModel.updateQuery(ObjectID(qury), data)
        if (getdata.error) {
            next(errors.internalError)
        }
        if (getdata == 0) {
            next(errors.dataNotFound)
        } else {
            res.status(httpStatus.OK).json({ message: constents.updateUser })
        }
    } catch (err) {
        next(err)
    }

}
const deleteuser = async(req, res, next) => {
    data = req.params.id
    getdata = await userModel.deleteQuery({ _id: ObjectID(data) })
    if (getdata.error) {
        next(errors.internalError)
    }
    if (getdata == 0) {
        next(errors.dataNotFound)
    } else {
        res.status(httpStatus.OK).json({ message: constents.deleteUser })
    }
}

const findAllDetail = async(req, res, next) => {
    data = req.body
    getdata = await userModel.findAllDetail(data)
    if (getdata.error) {
        next(errors.internalError)
    } else {
        res.status(httpStatus.OK).json(getdata)
    }

}
module.exports = {
    userReg,
    userList,
    updateuser,
    deleteuser,
    findAllDetail
}