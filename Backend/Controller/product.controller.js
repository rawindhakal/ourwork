const AllProducts = require("../models/AllProducts");



// @desc Delete track
// @route POST /api/product/
// @access public


exports.allProducts = async (req, res, next) => {
    AllProducts.find({}, (err, items)=>{
        if(err){
            res.send({
                error: err,
                message: 'No items Found',
                code: 204,
                success: false
            })
        }
        res.send({
            message: 'All Items Returned',
            data: items,
            code: 200,
            success: true
        })
    })
  };



// @desc Delete track
// @route POST /api/product/search/
// @access public
exports.searchProducts = async (req, res, next) => {
    const query = {};
    if(req.query.search){
        query.name ={
            $regex: req.query.search,
            $options: 'i'
        }
    }
    try {
        let products = await AllProducts.find(query).select('-photo');
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Searching Products")
    }
  };


// @desc Edit track
// @route POST /api/product/:id
// @access private
exports.singleProduct = async (req, res, next) => {
    let id = req.params.ID;
    AllProducts.findById(id, (err, product)=>{
        if(err){
            res.send({
                error: err,
                message: "Couldn't find the requested Product",
                code: 400
              });
        }
        res.send({
            message: 'Item found',
            data: product,
            code: 200
          });
    })
  };
