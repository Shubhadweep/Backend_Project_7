const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema=new Schema( {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category_details',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  })

const ProductModel = new mongoose.model("order_details", ProductSchema);  
module.exports = ProductModel;