const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User= require("../models/User.model")
const Product= require("../models/Product.model")
const Purchase= require("../models/Purchase.model")

const isLoggedIn = require('../middleware/isLoggedIn.middlewares');
const isAdmin = require('../middleware/isAdmin');
const isAdminOrUser = require('../middleware/isAdminOrUser.middleware');

// private route

router.get('/profile', isLoggedIn, isAdminOrUser, (req, res, next) => {

    
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
            dateOfBirth: dateOfBirth,
            isAdmin: req.session.user.role == "admin"
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
router.get("/:userId/cart", isLoggedIn, async (req, res, next) => {
    
    try {      
        
        const userId = req.session.user._id; 

        const userCart = await User.findById(userId)
         .populate({
             path: "cart",
             populate: {
                 path: "item",
                 model: "Product"
             }
         })
        // .populate("cart.item")
        .select("cart")
        console.log(userCart)
     



        
        res.render("user/cart.hbs", { userCart })

    } catch (error) {
        next (error)
    }

})


// POST route "/cart" => add to cart 
router.post("/:productId/cart", isLoggedIn, async (req, res, next) => {

    try {
        
        const productId = req.params.productId;
        const userId = req.session.user._id; 

        await User.findByIdAndUpdate(userId, 
            {$push: { cart: {quantity: 1, item: productId }}},)

            res.redirect(`/user/${userId}/cart`)


    } catch (error) {
        next (error)
    }

})


 // POST route "/:productId/remove" => remove from cart
 router.post("/:productId/remove", isLoggedIn, async (req, res, next) => {
     try {
         const productId = req.params.productId;
         const userId = req.session.user._id; 
         // Cuando tengamos el carrito, vamos a hacer un nuevo array ra luego remover un producto de ese nuevo array y luego actualizar el rrito con ese nuevo array.
         
         const user = await User.findById(userId) // busca al usuario por su id
         const updatedCart = user.cart.filter((item) => item.item.toString()!== productId) // filtra el carrito del usuario para eliminar el producto con el id correspondiente
         user.cart = updatedCart // asigna el nuevo carrito actualizado al usuario
         await user.save()

         res.redirect(`/user/${userId}/cart`)


     } catch (error) {
      next(error)
     }
 })


// POST route "/:cartId/remove-cart" => remove from cart
router.post("/remove-cart", isLoggedIn, async (req, res, next) => {
    try {
        // const cartId = req.params.cartId; // obtiene el id del carrito
        const userId = req.session.user._id; // obtiene el id del usuario

        const user = await User.findById(userId) // busca al usuario por su id
        user.cart = [] // vacia el contenido del carrito asignadole un array vacio
        await user.save() // guarda los cambios en la base de datos

        res.redirect(`/user/${userId}/cart`)

    } catch (error) {
        next(error)
    }
})


// // GET route "/:productId/pay" => go to payment page
// router.get("/:productId/pay", isLoggedIn, async (req, res, next) => {
//     try {
//         const productId = req.params.productId;
//         const userId = req.session.user._id;

//         // Actualizar el estado del producto a "purchased" en la base de datos
//         await Product.findByIdAndUpdate(productId, { purchased: true });

//         // Eliminar el producto del carrito del usuario
//         const user = await User.findById(userId);
//         const updatedCart = user.cart.filter((item) => item.item.toString() !== productId);
//         user.cart = updatedCart;
//         await user.save();

//         // Obtener el carrito actualizado del usuario con los productos comprados
//         const userCart = await User.findById(userId)
//             .populate({
//                 path: "cart",
//                 populate: {
//                     path: "item",
//                     model: "Product"
//                 }
//             });

//         res.render("user/purchase-success.hbs", { userCart });

//     } catch (error) {
//         next(error);
//     }
// });

// GET route "/:productId/pay" => go to payment page
router.get("/:productId/pay", isLoggedIn, async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const userId = req.session.user._id;
  
      // Obtener el usuario actual
      const user = await User.findById(userId);
  
      // Actualizar el estado del producto a "purchased" en la base de datos
      await Product.findByIdAndUpdate(productId, { purchased: true });
  
      // Agregar el producto al historial de compras del usuario
      user.purchasedItems.push(productId);
      await user.save();
  
      // Eliminar el producto del carrito del usuario
      user.cart = user.cart.filter((item) => item.item.toString() !== productId);
      await user.save();
  
      // Redirigir al usuario a la página de historial de compras
      res.render("user/purchase-success.hbs");
    } catch (error) {
      next(error);
    }
  });

// GET route "/purchase-history" => view purchase history
router.get("/purchase-history", isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.session.user._id;
        const user = await User.findById(userId)
            .populate("purchasedItems");
        
        res.render("user/purchase-history.hbs", { userCart: user });
    } catch (error) {
        next(error);
    }
});

  

  
  
  
  


  
// //! ruta para el admin

 router.get("/admin",isLoggedIn, isAdmin, (req, res ,next) => {
     res.render("user/admin-dashboard.hbs")
     console.log(req.session.user)
 })
 
//  router.get("/admin/list", isLoggedIn, isAdmin, (req,res,next) => {
//     res.render("/product/list.hbs")
//  })




module.exports = router;