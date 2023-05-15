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



const profileRouter = require('./profile.routes');
router.use('/user', profileRouter); 


module.exports = router;
