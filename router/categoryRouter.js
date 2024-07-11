const express = require("express");
const router = express.Router();
const { showCategory, addCategory, viewCategory } = require("../controller/categoryController");

router.get('/add-category', showCategory)
router.post('/create-category', addCategory)
router.get('/view-category', viewCategory)

module.exports = router