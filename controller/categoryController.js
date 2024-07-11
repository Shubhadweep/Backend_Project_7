const Category = require("../model/categoryModel");

//***************************************To Show The Category Form*********************************

const showCategory = async (req, res) => {
  try {
    let msg = req.flash("message");
    let message = msg.length > 0 ? msg[0] : null;
    res.render("category/add-category", {
      title: "Show category",
      message: message,
      path: "/add-category"
    });
  } catch (err) {
    console.log("error to show category", err);
  }
};

//***************************************Add Category***********************************************

const addCategory = async (req, res) => {
  try {
    // req.body.category = req.body.category
    let saveCategory = await Category.create(req.body);
    if (saveCategory && saveCategory._id) {
      req.flash("message", "Category Added Successfully!");
      res.redirect("/add-category");
    } else {
      req.flash("message", "Category Not Added Successfully!");
      res.redirect("/add-category");
    }
  } catch (err) {
    console.log("Error", err);
  }
};

//************************************show category******************************************

const viewCategory = async (req, res) => {
  try {
    let allCategory = await Category.find({});
    res.render("category/view-category", {
      title: "All category",
      categoryData: allCategory,
      path: "/view-category",
    });
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = {
  showCategory,
  addCategory,
  viewCategory,
};
