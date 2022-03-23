const mongoose = require("mongoose")
const randPassword = require("../utils/randamKey")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fatherName: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const user = mongoose.model("user", userSchema)



const insertQuery = async(data, res) => {
    pass = await randPassword.random_key()
    try {
        res = await user.insertMany({
            firstName: data.firstName || "null",
            lastName: data.lastName || "null",
            email: data.email,
            fatherName: data.fatherName || "null",
            countryCode: data.countryCode || "null",
            mobile: data.mobile || 0,
            address: data.address || "null",
            password: data.password || pass
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
        res = await user.find(data)
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
        res = await user.findByIdAndUpdate(qury, data)
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
        res = await user.deleteOne(data)
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
const findAllDetail = async(data = {}, res) => {
    try {
        res = await user.aggregate(
            [{
                    $lookup: {
                        from: 'payments',
                        let: { email: "$email" },
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ["$email", "$$email"]
                                },
                            },

                        }, {
                            $project: { cardName: 1, cardHolderName: 1, cardNo: 1, cvvNo: 1, exp_date: 1, payment_key: 1 }
                        }],
                        as: "detail",

                    },

                },
                {
                    $project: {
                        email: 1,
                        user_name: { $concat: ["$firstName", " ", "$lastName"] },
                        card_detail: "$detail"
                    }
                }
            ]
        );
        if (res.length > 0) {
            return res
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
    findAllDetail
}