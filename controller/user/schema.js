const joi = require("joi")

const userReg = joi.object().keys({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    fatherName: joi.string().min(3).required(),
    countryCode: joi.string().max(5).min(1),
    mobile: joi.number().integer().required().min(1000000000).max(9999999999),
    address: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirm_password: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
})
const updateUser = joi.object().keys({
    firstName: joi.string().min(3),
    lastName: joi.string().min(3),
    fatherName: joi.string().min(3),
    countryCode: joi.string().max(5).min(1),
    mobile: joi.number().integer().min(1000000000).max(9999999999),
    address: joi.string().min(3)
})
module.exports = {
    userReg,
    updateUser
}