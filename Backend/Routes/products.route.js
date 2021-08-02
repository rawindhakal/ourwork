const express = require("express");
const router = express.Router();
const {
  searchProducts,
  singleProduct,
  allProducts
} = require("../controller/product.controller");

router.route("/search").get(searchProducts);
router.route("/:id").post(singleProduct);
router.route("/all").post(allProducts);


module.exports = router;
