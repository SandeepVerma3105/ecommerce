const joi = require("joi")

const login = joi.object().keys({
    userName: joi.string().email().required(),
    password: joi.string().required()
})

const createUser = joi.object().keys({
    email: joi.string().email().required()
})

module.exports = {
    login,
    createUser
}