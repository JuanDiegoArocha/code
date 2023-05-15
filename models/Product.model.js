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
    type: String,
    required: true,

  },
  stock: {
    type: Number,
    required: true,
  },
  coverImage: String //! a traves de cloudinary porner las URL
},
  {
  //esto es para añadir propiedades : `createdAt` y `updateAt`
  timestamps: true
  }
  );

const Product = model("Product", productSchema);

module.exports = Product;