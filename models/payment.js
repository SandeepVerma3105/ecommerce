const mongoose = require("mongoose")
const key = require("../utils/randamKey")

const paymentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cardName: {
        type: String,
        required: true
    },

    cardNo: {
        type: String,
        required: true
    },
    cardHolderName: {
        type: String,
        required: true
    },
    cvvNo: {
        type: Number,
        required: true,

    },
    expDate: {
        type: String,
        required: true
    },
    paymentKey: {
        type: Number,
        required: true,
        unique: true
    }
})

const payment = mongoose.model("payment", paymentSchema)

const insertQuery = async(data, res) => {
    paymentKey = await key.random_key()

    try {
        res = await payment.insertMany({
            email: data.email,
            cardNo: data.cardNo,
            cardName: data.cardName,
            cardHolderName: data.cardHolderName,
            cvvNo: data.cvvNo,
            expDate: data.expDate,
            paymentKey: paymentKey,
        })
        if (res.length > 0) {
            return res
        }
    } catch (error) {
        return error
    }
}

const findQuery = async(data = {}, res) => {
    try {
        res = await payment.find(data)
        if (res.length > 0) {
            return res
        } else {
            return 0
        }
    } catch (error) {
        return error
    }
}
const updateQuery = async(qury, data, res) => {
    try {
        res = await payment.findByIdAndUpdate(qury, data)
        console.log(res)
        if (res == null) {
            return 0
        } else {
            return 1
        }
    } catch (error) {
        return error
    }
}

const deleteQuery = async(data, res) => {
    try {
        res = await payment.deleteOne(data)
        console.log(res)
        if (res.deletedCount == 1) {
            return 1
        } else {
            return 0
        }
    } catch (error) {
        return error
    }
}


module.exports = {
    insertQuery,
    findQuery,
    updateQuery,
    deleteQuery,

}