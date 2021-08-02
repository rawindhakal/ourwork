const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const AllProductSchema = new Schema({
    name: {
        type: String
      },
    site: {
          type: String
      },
    link: {
        type: String
      },
    imgUrl: {
        type: String
      },
    price: {
        type: Number
      },
    created_date: {
        type: Date,
        default: Date.now
      },
    updated_date: {
        type: Date,
        default: Date.now
      }
})

module.exports = AllProduct = mongoose.model("AllProduct", AllProductSchema);
