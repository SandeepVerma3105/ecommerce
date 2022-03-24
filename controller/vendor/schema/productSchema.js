const joi = require("joi")
const pattern = require("../../../utils/regex")
const addProduct = joi.object().keys({
    name: joi.string().min(3).required().regex(pattern.productPattern),
    price: joi.number().required(),
    currency: joi.string().required(),
    description: joi.string().required().regex(pattern.productPattern),
    quantity: joi.number().integer().required(),
    category: joi.string().required(),
    vendorId: joi.string().required().min(24).max(24),
})

const updateProduct = joi.object().keys({
    name: joi.string().min(3).regex(pattern.productPattern),
    price: joi.number(),
    currency: joi.string(),
    description: joi.string().regex(pattern.productPattern),
    quantity: joi.number().integer(),
    category: joi.string(),
    vendorId: joi.string().min(24).max(24),
})
const productListByVendor = joi.object().keys({
    vendorId: joi.string().required()
})

const productByProductId = joi.object().keys({
    productId: joi.string().required().min(12).max(12)
})

module.exports = {
    addProduct,
    productListByVendor,
    productByProductId,
    updateProduct
}