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

module.exports = {
    userAdmin
}