const express = require('express');
const router = express.Router();

const User= require("../models/User.model")

const isLoggedIn = require('../middleware/isLoggedIn.middlewares');

// private route

router.get('/profile', isLoggedIn, (req, res, next) => {
    
    User.findById(req.session.user._id)
    
    .then((user) => {
        console.log(user)

        const dateOfBirth = user.dateOfBirth.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric" 
        })
        console.log(user.dateOfBirth.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric" 
        }))


        res.render("user/profile.hbs", {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            city: user.city,
            postalCode: user.postalCode,
            dateOfBirth: dateOfBirth
        });

    })
    .catch((err) => {
        next (err)
    })
    
});

// GET Edit Profile route
router.get("/edit-profile", isLoggedIn, (req, res, next) => {
    User.findById(req.session.user._id)
    .then((user) => {

        res.render("user/edit-profile.hbs", {
            user,
        })

    })
    .catch((err) => {
        next (err)
    })
})


// POST Edit Profile route
router.post("/edit-profile", isLoggedIn, async (req, res, next) => {
    try {

        const userId = req.session.user._id;

        const { firstName, 
            lastName, 
            email, 
            address, 
            city, 
            postalCode, 
            dateOfBirth
         } = req.body;

         const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email,
            address,
            city,
            postalCode,
            dateOfBirth
         },
         { new: true }
         )
         res.redirect("/user/profile")

    } catch (error) {
        next (error)
    }


})




// GET Cart route
router.get("/cart", isLoggedIn, async (req, res, next) => {
    
    try {
        res.render("user/cart.hbs")
        
    } catch (error) {
        next (error)
    }

})



module.exports = router;