const express = require("express")
const Router = express.Router()
    // const userRoute = require("./user/index")
    // const paymentRoute = require("./payment/index")
const vendorRoute = require("./vendor")
const adminRoute = require("./Admin/index")

Router.use(express.json())
Router.use(express.urlencoded({ extended: false }))

// Router.use("/user", userRoute)
// Router.use("/payment", paymentRoute)
Router.use("/vendor", vendorRoute)
Router.use("/admin", adminRoute)



module.exports = Router