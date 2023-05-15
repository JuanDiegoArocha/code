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
  res.redirect("/product/create")


 } catch(error){
    next(error);
 }

 });


 //! Ruta para editar productos en la base de datos
 //GET "/:productId/edit" -> renderizar un formulario de edit (con los valores actuales del producto)
/*
 router.get("/:productId/edit", (req, res, next) => {
    //queremos buscar los detalles del producto por su id y los pasamos a la vista
    Product.findById(req.params.productId)
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
      */
      router.get("/edit", (req, res, next) => {
        res.render("product/edit.hbs")
      })

 



module.exports = router;