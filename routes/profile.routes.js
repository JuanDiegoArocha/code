const express = require('express');
const router = express.Router();

const User= require("../models/User.model")

const isLoggedIn = require('../middleware/auth.middlewares');

// private route

router.get('/profile', isLoggedIn, (req, res, next) => {
    
    User.findById(req.session.user._id)
    
    .then((user) => {
        console.log(user)

        user.dateOfBirth = user.dateOfBirth.toString()
        console.log(user.dateOfBirth.toString())


        res.render("user/profile.hbs", {
            user
        })

    })
    .catch((err) => {
        next (err)
    })
    
});


// Cart route


module.exports = router;