const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/login', (req, res) => {
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.redirect('/')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        res.render('home', {
            user
        })
    } catch (e) {
        res.redirect("/").status(400).send()
    }
})

module.exports = router