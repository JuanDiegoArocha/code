const express = require('express');
const Product = require('../models/Product.model');
const router = express.Router();
const uploader = require("../middleware/uploader.js");
const isLoggedIn = require('../middleware/isLoggedIn.middlewares');
const isAdmin = require('../middleware/isAdmin');
const isAdminOrUser = require('../middleware/isAdminOrUser.middleware');


//! Ruta para agregar productos en la base de datos
//GET "/create" -> crear un producto nuevo
 router.get("/create", (req, res, next) => {

    res.render("product/create.hbs");
 })


 //POST "/create" => Añadir más stock de un producto que ya existe
 router.post("/create", isLoggedIn, isAdmin ,uploader.single("image") ,async (req, res, next) => {
 try{
  //const{ name, description, price, stock, } = req.body;
  console.log(req.body)
  console.log(req.file)

  if (req.file === undefined){
    next("poner imagen")
    return
  }
  //! create product
   await Product.create({
    name: req.body.name,
     description: req.body.description,
     price: req.body.price,
     stock: req.body.stock,
     image: req.file.path
   })

  //!actualizar product?
//   await Product.findOneAndUpdate({
//     name,
//     description,
//     price,
//     stock
//   })

  //! redirect a la misma pagina?
  res.redirect("/product/list")


 } catch(error){
    next(error);
 }

 });


//! Ruta de la lista de produtcos
//GET "/list" -> queremos ver la lista de todos los productos de la base de datos
router.get("/list", isAdminOrUser, (req, res, next) => {
    Product.find()
      .select({ name: 1, price: 1, }) // faltará la imagen aqui
      .then((allProducts) => {
        //console.log(allProducts);
  
        res.render("product/list.hbs", {
          allProducts, 
          isAdmin: req.session.user.role === "admin"
        });
      })
      .catch((error) => {
        next(error);
      });
  });


 //! Ruta para editar productos en la base de datos
 //GET "/:productId/edit" -> renderizar un formulario de edit (con los valores actuales del producto)

 router.get("/:productId/edit",isLoggedIn, isAdmin,(req, res, next) => {
    //queremos buscar los detalles del producto por su id y los pasamos a la vista
    Product.findById(req.params.productId)
    //.populate("name")
      .then((productDetails) => {
          //console.log(productDetails)
         
        res.render("product/edit.hbs", {
          productDetails, 
         
        });
      })
      .catch((err) => {
        next(err);
      });
      });



// //! Ruta para poder editar los datos de un producto
 //POST "/:productId/edit" => editar los datos del producto y actualizarlo en la BD

router.post("/:productId/edit", isLoggedIn, isAdmin ,uploader.single("image") , async (req, res, next) => {
    try{
     //const{ name, description, price, stock, image } = req.body;
     const result = await Product.findByIdAndUpdate(
        req.params.productId,
        {
   
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          image: req.file,
     },
     {new: true}
     )
   
     //! redirect a list
     res.redirect("/product/list")
   
   
    } catch(error){
       next(error);
    }
   
    });
   

//! Ruta para ver los detalles de los productos
//GET "/list" -> queremos ver la lista de todos los productos de la base de datos
router.get("/:productId/details", isAdminOrUser, (req, res, next) => {
    Product.findById(req.params.productId)
    // .select({ name: 1, stock: 1 })
      .then((productDetails) => {
        //console.log(allProducts);
  
        res.render("product/details.hbs", {
          productDetails, 
          isAdmin: req.session.user.role === "admin"
        });
      })
      .catch((error) => {
        next(error);
      });
  });


       //! Ruta borrar productos de la lista

   router.post("/:productId/delete",isLoggedIn, isAdmin ,(req, res, next) => {
    
      Product.findByIdAndDelete(req.params.productId)
    
      .then(() => {
         res.redirect("/product/list");
        })
        .catch((err) => {
          next(err);
        });
    });


    
 

//? PREGUNTAR MAÑANA A JORGE POR LA RUTA 

     
      


module.exports = router;