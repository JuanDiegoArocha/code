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

  purchased: {
    type: Boolean,
    default: false,
  },

  image: String, //! a traves de cloudinary porner las URL
  
},
  {
  //esto es para añadir propiedades : `createdAt` y `updateAt`
  timestamps: true
  }
  );

const Product = model("Product", productSchema);

module.exports = Product;