const express = require("express")
const route = express.Router()
const userCotroller = require("./userController")
const userSchema = require("./schema")
const { requestValidator } = require("../../middleware/request_validator")

route.post("/userReg", requestValidator(userSchema.userReg), userCotroller.userReg)
route.get("/userList", userCotroller.userList)
route.put("/updateuser/:id", requestValidator(userSchema.updateUser), userCotroller.updateuser)
route.delete("/deleteuser/:id", userCotroller.deleteuser)
route.get("/findAllDetail", userCotroller.findAllDetail)
module.exports = route