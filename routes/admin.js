const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();
const productController = require("./../controllers/products");

// /admin/add-product => GET
router.get("/add-product", productController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productController.postAddProduct);

exports.routes = router;
