// const express = require('express');
// const router = express.Router();

// const mongoose = require('mongoose');

// const User= require("../models/User.model")
// const Product= require("../models/Product.model")
// const Purchase= require("../models/Purchase.model")

// const isLoggedIn = require('../middleware/isLoggedIn.middlewares');

// // private route

// router.get('/profile', isLoggedIn, (req, res, next) => {
    
//     User.findById(req.session.user._id)
    
//     .then((user) => {
//         console.log(user)

//         const dateOfBirth = user.dateOfBirth.toLocaleDateString("en-US", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric" 
//         })
//         console.log(user.dateOfBirth.toLocaleDateString("en-US", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric" 
//         }))


//         res.render("user/profile.hbs", {
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             address: user.address,
//             city: user.city,
//             postalCode: user.postalCode,
//             dateOfBirth: dateOfBirth
//         });

//     })
//     .catch((err) => {
//         next (err)
//     })
    
// });

// // GET Edit Profile route
// router.get("/edit-profile", isLoggedIn, (req, res, next) => {
//     User.findById(req.session.user._id)
//     .then((user) => {

//         res.render("user/edit-profile.hbs", {
//             user,
//         })

//     })
//     .catch((err) => {
//         next (err)
//     })
// })


// // POST Edit Profile route
// router.post("/edit-profile", isLoggedIn, async (req, res, next) => {
//     try {

//         const userId = req.session.user._id;

//         const { firstName, 
//             lastName, 
//             email, 
//             address, 
//             city, 
//             postalCode, 
//             dateOfBirth
//          } = req.body;

//          const updatedUser = await User.findByIdAndUpdate(userId, {
//             firstName,
//             lastName,
//             email,
//             address,
//             city,
//             postalCode,
//             dateOfBirth
//          },
//          { new: true }
//          )
//          res.redirect("/user/profile")

//     } catch (error) {
//         next (error)
//     }


// })




// // GET Cart route
// router.get("/:userId/cart", isLoggedIn, async (req, res, next) => {
    
//     try {      
        
//         const userId = req.session.user._id; 

//         const userCart = await User.findById(userId)
//         .populate({
//             path: "cart",
//             populate: {
//                 path: "item",
//                 model: "Product"
//             }
//         })
        
//         .select("cart")
//         console.log(userCart)
     



        
//         res.render("user/cart.hbs", { userCart })

//     } catch (error) {
//         next (error)
//     }

// })


// // POST route "/cart" => add to cart 
// router.post("/:productId/cart", isLoggedIn, async (req, res, next) => {

//     try {
        
//         const productId = req.params.productId;
//         const userId = req.session.user._id; 

//         await User.findByIdAndUpdate(userId, 
//             {$push: { cart: {quantity: 1, item: productId }}},)

//             res.redirect(`/user/${userId}/cart`)


//     } catch (error) {
//         next (error)
//     }

// })


// // POST route "/:productId/remove" => remove from cart
// route.post("/:productId/remove", async (req, res, next) => {
//     try {

//         const productId = req.params.productId;
//         const userId = req.session.user._id; 

//         User.findById(userId)
//         // Cuando tengamos el carrito, vamos a hacer un nuevo array para luego remover un producto de ese nuevo array y luego actualizar el carrito con ese nuevo array.



        
//     } catch (error) {
//      next(error)   
//     }
// }) 


// // GET route "/:productId/pay" => go to payment page
// router.get("/:productId/pay", isLoggedIn, async (req, res, next) => {
//     try {
//         const productId = req.params.productId;
//         const userId = req.session.user._id;

//         // Aqui se actualiza es estado del producto
//         await Product.findByIdAndUpdate(productId, { purchased: true })

//         res.render("user/purchase-seccess.hbs", { productId })

//     } catch (error) {
//         next(error)
//     }
// })

  



// module.exports = router;