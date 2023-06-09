const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// Authentication routes

// GET "/auth/signup" => Signup page
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST "/auth/signup" => Signup

// All fields have information
router.post("/signup", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      postalCode,
      dateOfBirth,
    } = req.body;
    console.log(req.body);

    // Check if all fields have information

    if (
      firstName === undefined ||
      lastName == undefined ||
      email == undefined ||
      password == undefined ||
      address == undefined ||
      city === undefined ||
      postalCode == undefined ||
      dateOfBirth == undefined
    ) {
      console.log("Please fill in all fields");
      res.render("auth/signup", {
        errorMessage: "Please fill in all fields",
      });
      return;
    }

    // Password validation
    // Password must be at least 8 characters long and contain at least one number and one letter (valid characters are A-Z, a-z, 0-9)
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (regexPassword.test(password) === false) {
      res.render("auth/signup.hbs", {
        errorMessage:
          "Password must be at least 8 characters long and contain at least one number and one letter (valid characters are A-Z, a-z, 0-9)",
      });
      return;
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // email already exists

    const foundEmail = await User.findOne({ email: email });
    if (foundEmail !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Email already exists",
      });
      return;
    }

    // Create new user in the database
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      address: address,
      city: city,
      postalCode: postalCode,
      dateOfBirth: dateOfBirth,
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
});

// POST "/auth/login" => Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if all fields have information
    if (!email || !password) {
      console.log("Please fill in all fields");
      res.render("auth/login");
      errorMessage = "Please fill in all fields";
      return;
    }

    // Email already exists in the database
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.render("auth/login.hbs", {
        errorMessage: "Email does not exist",
      });
    }
    console.log(foundUser, "Email does not exist");

    // rigth password is correct
    const isCorrectPassword = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isCorrectPassword) {
      res.render("auth/login.hbs", {
        errorMessage: "Wrong password",
      });
      return;
    }
    console.log(isCorrectPassword, "Password");

    req.session.user = foundUser; // Create a new session for the logged in user

    console.log(req.session.user, "Login");

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});

// GET "/auth/logout" => Logout session with

router.get("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
