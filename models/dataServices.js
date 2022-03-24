const { product } = require("./products")
const { payment } = require("./payment")
const { user } = require("./user")
const { userAdmin } = require("./userAdmin")

const findQuery = async(model, data = {}, res) => {
    if (model == "product") {
        model = product
    }
    if (model == "user") {
        model = user
    }
    if (model == "payment") {
        model = payment
    }
    if (model == "userAdmin") {
        model = userAdmin
    }
    try {
        res = await model.find(data)
        if (res.length > 0) {
            return res
        } else {
            return 0
        }
    } catch (error) {
        return error
    }
}

const insertQuery = async(model, data, res) => {
    if (model == "product") {
        model = product
    }
    if (model == "user") {
        model = user
    }
    if (model == "payment") {
        model = payment
    }
    if (model == "userAdmin") {
        model = userAdmin
    }
    try {
        res = await model.insertMany(data)
        if (res.length > 0) {
            return res
        }
    } catch (error) {
        return error
    }
}

const updateQuery = async(model, qury, data, res) => {
    if (model == "product") {
        model = product
    }
    if (model == "user") {
        model = user
    }
    if (model == "payment") {
        model = payment
    }
    if (model == "userAdmin") {
        model = userAdmin
    }
    try {
        res = await model.findByIdAndUpdate(qury, data)
        if (res == null) {
            return 0
        } else {
            return 1
        }
    } catch (error) {
        return error
    }
}
const deleteQuery = async(model, data, res) => {
    if (model == "product") {
        model = product
    }
    if (model == "user") {
        model = user
    }
    if (model == "payment") {
        model = payment
    }
    if (model == "userAdmin") {
        model = userAdmin
    }
    try {
        res = await model.deleteOne(data)
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

const findAllDetail = async(model, data = {}, res) => {
    if (model == "product") {
        model = product
    }
    if (model == "user") {
        model = user
    }
    if (model == "payment") {
        model = payment
    }
    if (model == "userAdmin") {
        model = userAdmin
    }
    try {
        res = await model.aggregate(
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
    findQuery,
    insertQuery,
    updateQuery,
    deleteQuery,
    findAllDetail
}