const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const port = process.env.PORT
const routes = require("./controller/index")
const mongoose = require("./config/connection")

app.use("", routes)
app.listen(port, (err) => {
    if (err) throw err
    else {
        console.log("sever running on port:", port)
    }
})