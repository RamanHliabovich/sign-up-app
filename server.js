const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/users')
const cors = require('cors')
const ejs = require('ejs')

var pubDir = __dirname + "/public"

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('database connected'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(pubDir))
app.use(cors())

app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    next()
})

app.use('/', routes)
app.listen(3000, () => console.log("server is up and running"))