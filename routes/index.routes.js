const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require('./auth.routes');
router.use('/auth', authRouter); 

const productRouter = require('./product.routes');
router.use('/product', productRouter);



module.exports = router;
