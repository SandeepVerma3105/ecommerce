const joi = require("joi")
const pattern = require("../../../utils/regex")

const userReg = joi.object().keys({
    firstName: joi.string().min(3).required().regex(pattern.strPattern),
    lastName: joi.string().min(3).required().regex(pattern.strPattern),
    email: joi.string().email().required(),
    fatherName: joi.string().min(3).required().regex(pattern.strPattern),
    countryCode: joi.string().max(5).min(2).regex(pattern.conturyCodePatter),
    // mobile: joi.number().integer().required().min(1000000000).max(9999999999),
    mobile: joi.string().length(10).regex(pattern.mobileNoPattern).required(),
    address: joi.string().required(),
    password: joi.string().required().regex(pattern.passwordPattern),
    confirmPassword: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
})
const updateUser = joi.object().keys({
    firstName: joi.string().min(3).regex(pattern.strPattern),
    lastName: joi.string().min(3).regex(pattern.strPattern),
    fatherName: joi.string().min(3).regex(pattern.strPattern),
    countryCode: joi.string().max(5).min(1).regex(pattern.conturyCodePatter),
    mobile: joi.string().length(10).regex(pattern.mobileNoPattern),
    address: joi.string().min(3)
})
const login = joi.object().keys({
    userName: joi.string().email().required(),
    password: joi.string().required()
})

const userDetail = joi.object().keys({
    userName: joi.string().required().email()
})
module.exports = {
    userReg,
    updateUser,
    login,
    userDetail
}