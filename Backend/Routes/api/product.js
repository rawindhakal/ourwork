const SingleProduct = require("../../Model/SingleProduct");
const express = require("express");
const router = express.Router();
// import scraper from '../../Controller/CronController'
const authenticated = require('../../Middleware/validation/authenticated');
const AllProducts = require("../../Model/AllProducts");


//add products for API testing only
router.post('/addProduct', (req, res) => {
    const name = req.body.name;
    const prices = req.body.prices;
    const images = req.body.images;
    const category = req.body.category;
    const url = req.body.url;
    const newProduct = new Product({
        name, prices, images, category, url
    });
    newProduct
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    // Product.findOne({ name }).then(product => {
    //     if (product) {
    //         return res.status(400).json({ email: "Catrgory Already Exist!" });
    //       }else{
    //         const newProduct = new Product({
    //             name, prices,images,category,url
    //           });
    //       }  
    // })
});
//fetch all products
router.get('/get-all', async (req, res) => {
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
});

//search product
router.get('/search', async(req,res)=>{
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
})

//single product by ID
router.get('/:ID', async (req, res) => {
    let id = req.params.ID;
    SingleProduct.findById(id, (err, product)=>{
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
});

//GET all tracking products
router.get('/tracking-products',(req,res)=>{
    SingleProduct.find({},(err, products)=>{
        let trackingProducts = [];
        products.forEach(element => {
            if(element.tracking == true){
                trackingProducts.push(element);
            }
        });
        if(err){
            res.send({
                msg: 'No Products in Tracking',
                success: false,
                error: err
            });
        }
        res.send({
            msg: 'Tracking Products Returned',
            data: trackingProducts,
            success: true
        })
    })
})

//update Product
router.post('/update-product',authenticated.onlyAuthUser, (req, res)=>{
    let id = req.body.id;
    let targetPrice = req.body.targetPrice;
    let updatePrice = cron_update_item(id, targetPrice);
    if(updatePrice){
        res.send({
            success: true,
            message: 'Item Update Successfully'
        });
    }
})

module.exports = router;

//Wifi-password: CLB39EA42A