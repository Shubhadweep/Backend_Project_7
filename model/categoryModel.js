const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorySchema = new Schema(
    {
      category: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )

const CategoryModel = new mongoose.model("category_details", CategorySchema);  
module.exports = CategoryModel;