const mongoose = require("mongoose")

const userAdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const userAdmin = mongoose.model("useradmin", userAdminSchema)

const insertQuery = async(data, res) => {
    try {
        res = await userAdmin.insertMany({
            name: data.name,
            email: data.email,
            password: data.password,
            roll: data.roll
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
        res = await userAdmin.find(data)
        console.log(res)
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
    findQuery
}