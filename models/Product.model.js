const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  price: {
    type: Number,
    required: true,

  },
  stock: {
    type: Number,
    required: true,
  },
<<<<<<< HEAD
  purchased: {
    type: Boolean,
    default: false,
  },
  coverImage: String //! a traves de cloudinary porner las URL
=======
  image: String //! a traves de cloudinary porner las URL
>>>>>>> 522df9e76fd3338d62b75cd009b14b65bdb9a09f
},
  {
  //esto es para añadir propiedades : `createdAt` y `updateAt`
  timestamps: true
  }
  );

const Product = model("Product", productSchema);

module.exports = Product;