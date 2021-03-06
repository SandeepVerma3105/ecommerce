const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const url = process.env.URL

//create connection with mongodb
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', function() {
    console.log("connected")
})
module.exports = mongoose