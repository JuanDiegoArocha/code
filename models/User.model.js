const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    lastName: {
      type: String,
      trim: true,
      required: false,
      unique: true 
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    cart: {
type: [{
quantity: {type: Number},
item: {type: Schema.Types.ObjectId,
ref: "Product"},
}]
    },
    purchasedItems: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
