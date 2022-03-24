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



module.exports = {
    payment
}