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
        required: true
    },
    vendorId: {
        type: String,
        required: true
    }
})

const product = mongoose.model("product", productSchema)

const insertQuery = async(data, res) => {
    console.log("hhhhhhhhh", data)
    try {
        res = await product.insertMany({

            name: data.name,
            price: data.price,
            currency: data.currency,
            description: data.description,
            quantity: data.quantity,
            category: data.category,
            vendorId: data.vendorId,

        })

        if (res.length > 0) {
            console.log(res)
            return res
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

const findQuery = async(data = {}, res) => {
    try {
        res = await product.find(data)
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
        res = await product.findByIdAndUpdate(qury, data)
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
        res = await product.deleteOne(data)
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
    deleteQuery
}