const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

// Authentication routes

// GET "/auth/signup" => Signup page
router.get("/signup", (req, res, next) => {

    res.render("auth/signup.hbs");
})

// POST "/auth/signup" => Signup

// All fields have information
router.post("/signup", async (req, res, next) => {
    try {

        const { firstName, lastName, email, password, direction, city, postalCode, dateOfBirth } = req.body;
        console.log(req.body);

        // Check if all fields have information
    
        if (firstName === "" || lastName == "" || email == "" || password == "" || direction == "" || city === "" || postalCode == "" || dateOfBirth == "") {
            console.log("Please fill in all fields");
            res.redirect("/auth/signup");
            errorMessage = "Please fill in all fields";
            return; 
        }

        // Password validation
        // Password must be at least 8 characters long and contain at least one number and one letter (valid characters are A-Z, a-z, 0-9) 
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        if (regexPassword.test(password) === false) {
            return res.render("auth/signup.hbs", {
                errorMessage: "Password must be at least 8 characters long and contain at least one number and one letter (valid characters are A-Z, a-z, 0-9)" 
            })
        }

        // Password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 
        console.log(hashedPassword);

        // email validation
        // const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
        // if (regexEmail.test(email) === false) {
        //     res.render("auth/signup.hbs", {
        //         errorMessage: "Please enter a valid email address"
        //     })
        // } 

        // email already exists

        const foundEmail = await User.findOne({ email: email });
        if (foundEmail !== null) {
            res.render("auth/signup.hbs", {
                errorMessage: "Email already exists"
            }) 
        }

        // Create new user in the database
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            direction: direction,
            city: city,
            postalCode: postalCode,
            dateOfBirth: dateOfBirth
        });

        // Redirect to the login page
        res.redirect("/auth/login");




        




    } catch (error) {
        next(error);   
    }

    

});

// GET "/auth/login" => Login page

router.get("/login", (req, res, next) => {

    res.render("auth/login.hbs");
}) 





// POST "/auth/login" => Login


module.exports = router;