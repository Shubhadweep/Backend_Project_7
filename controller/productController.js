const Product = require('../model/productModel')
const Category = require('../model/categoryModel')

//**************************************show add product form*******************************************
  let showProductForm=async (req, res)=>{
    try {
      let allCategory = await Category.find({})
      res.render('product/add-product', {
        title:"Add product",
        allCategory:allCategory,
        path:"/show-product-form",
        message: req.flash('message'),
      })
    } catch (err) {
     console.log("Error",err);
    }
  }


  //*************************************Add product***********************************
  const addProduct=async (req, res)=> {
    try {
      // console.log(req.body)
      let saveProduct = await Product.create(req.body)
      if (saveProduct && saveProduct._id) {
        req.flash('message', 'Product Added successfully')
        res.redirect('/show-product-form')
      } else {
        req.flash('message', 'Product Not Added successfully')
        res.redirect('/show-product-form')
      }
    } catch (err) {
      console.log("Error",err);
    }
  }

  const  showProductTable=async (req, res) =>{
    try {
      let allProduct = await Product.aggregate([
        {
          $lookup: {
            from: 'category_details',
            let: {
              categoryId: '$category',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$_id', '$$categoryId'] }],
                  },
                },
              },
            ],
            as: 'category',
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            'category.createdAt': 0,
            'category.updatedAt': 0,
          },
        },
        {
          $unwind: {
            path: '$category',
          },
        },
      ])
      console.log("All Product:",allProduct)
      res.render('product/view-product', {
        title:"All product",
        path:"/show-product-table",
        allProduct,
      })
    } catch (err) {
      throw err
    }
  }


module.exports = {
  showProductForm,
  addProduct,
  showProductTable
}
