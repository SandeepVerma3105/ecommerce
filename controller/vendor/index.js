const express = require("express")
const route = express.Router()
const jwt = require("../../utils/jwtToket")
const vendorController = require("./vendorController")
const paymentSchema = require("./schema/paymentSchema")

const { requestValidator } = require("../../middleware/request_validator")
const vendorSchema = require("./schema/vendorSchema")
const productSchema = require("./schema/productSchema")
const verifyToken = require("../../middleware/auth")

/*-----------------------------------------------vendor--------------------------------------------*/

route.post("/userReg", requestValidator(vendorSchema.userReg), vendorController.userReg)
route.post("/login", requestValidator(vendorSchema.login), vendorController.userLogin)
route.get("/userDetail", requestValidator(vendorSchema.userDetail), verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.userDetail)
route.put("/updateuser/:id", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(vendorSchema.updateUser), vendorController.updateuser)
route.delete("/deleteuser/:id", verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.deleteuser)
route.get("/findAllDetail", verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.findAllDetail)

//*-------------------------------------------products---------------------------------------------------------*//

route.post("/addProduct", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(productSchema.addProduct), vendorController.addProduct)
route.get("/productList", verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.productList)
route.get("/productListByVendor", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(productSchema.productListByVendor), vendorController.productList)
route.get("/productByProductId", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(productSchema.productByProductId), vendorController.productList)
route.put("/updateProduct/:id", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(productSchema.updateProduct), vendorController.updateProduct)
route.delete("/deleteProduct/:id", verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.deleteProduct)


//*-----------------------------------------payment----------------------------------------------------------------*//

route.post("/paymentDetails", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(paymentSchema.paymentDetail), vendorController.paymentDetail)
route.get("/paymentList", verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.paymentList)
route.put("/updatePayment/:id", verifyToken.verifyToken, verifyToken.parseJwtVendor, requestValidator(paymentSchema.updatePayment), vendorController.updatepayment)
route.delete("/deletePayment/:id", verifyToken.verifyToken, verifyToken.parseJwtVendor, vendorController.deletepayment)

module.exports = route