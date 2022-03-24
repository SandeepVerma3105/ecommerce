const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const { Schema } = require("../config/connection")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Electronic", "Sport"]
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const product = mongoose.model("product", productSchema)


module.exports = {
    product
}