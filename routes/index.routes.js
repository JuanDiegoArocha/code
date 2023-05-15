const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require('./auth.routes');
router.use('/auth', authRouter); 

<<<<<<< HEAD
const productRouter = require('./product.routes');
router.use('/product', productRouter);


=======
const profileRouter = require('./profile.routes');
router.use('/user', profileRouter); 
>>>>>>> 2e33ae86509e6f967e596f164a313fe86709dff6

module.exports = router;
