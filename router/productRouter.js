const express = require("express");
const router = express.Router();

const { showProductForm, addProduct, showProductTable } = require("../controller/productController");



router.get('/show-product-form', showProductForm)
router.post('/add-product', addProduct)
router.get('/show-product-table', showProductTable)

module.exports = router