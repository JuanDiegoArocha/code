const express = require('express');
const Product = require('../models/Product.model');
const router = express.Router();



//! Ruta para agregar productos en la base de datos
//GET "/create" -> crear un producto nuevo
 router.get("/create", (req, res, next) => {

    res.render("product/create.hbs");
 })


 //POST "/create" => Añadir más stock de un producto que ya existe
 router.post("/create", async (req, res, next) => {
 try{
  const{ name, description, price, stock } = req.body;
  
  //! create product
   await Product.create({
    name,
     description,
     price,
     stock
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
router.get("/list", (req, res, next) => {
    Product.find()
      .select({ name: 1, price: 1, }) // faltará la imagen aqui
      .then((allProducts) => {
        //console.log(allProducts);
  
        res.render("product/list.hbs", {
          allProducts, 
        });
      })
      .catch((error) => {
        next(error);
      });
  });


 //! Ruta para editar productos en la base de datos
 //GET "/:productId/edit" -> renderizar un formulario de edit (con los valores actuales del producto)

 router.get("/:productId/edit", (req, res, next) => {
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

router.post("/:productId/edit", async (req, res, next) => {
    try{
     const{ name, description, price, stock } = req.body;
     const result = await Product.findByIdAndUpdate(
        req.params.productId,
        {
   
       name,
       description,
       price,
      stock,
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
router.get("/:productId/details", (req, res, next) => {
    Product.findById(req.params.productId)
    // .select({ name: 1, stock: 1 })
      .then((productDetails) => {
        //console.log(allProducts);
  
        res.render("product/details.hbs", {
          productDetails, 
        });
      })
      .catch((error) => {
        next(error);
      });
  });

       //! Ruta borrar productos de la lista

//   router.post("/:productId/delete", (req, res, next) => {
//     // console.log(req.params);
//      Product.findByIdAndDelete(req.params.productId)
//        .then(() => {
//          res.redirect("/product/list");
//        })
//        .catch((err) => {
//          next(err);
//        });
//    });
 



module.exports = router;