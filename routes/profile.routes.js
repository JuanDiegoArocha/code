const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/auth.middlewares');

// private route

router.get('/profile', isLoggedIn, (req, res, next) => {
    
    const user = req.session.user;
    
    console.log(user, "user is logged in")
    
    res.render("user/profile.hbs", {
        user: user
    })
});



module.exports = router;