const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    },
        {
            timestamps: true
        }
    );

    const Purchase = model("Purchase", purchaseSchema);

    module.exports = Purchase;