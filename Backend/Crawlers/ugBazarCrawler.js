const needle = require('needle')
const mongodb = require('./mongodb.connect');

module.exports.ugCrawler = async()=>{
    const MongoClient = await mongodb();
    const pagesize = 24;
    let totalProdcts = 1000;
    let totalPage = 1000;
    const ugbazar = MongoClient.db('Ecommerce-Price-Tracker');
    const ug = ugbazar.collection('allproducts');
    let i =0;
    for(let pageNo =1; pageNo<totalPage; pageNo= pageNo+1){
        const result = await needle(
            "get",
            `https://www.ugbazaar.com/api/V2/products?page=${pageNo}`,{
    
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
                    "access-control-allow-origin": "*",
                    "cache-control": "no-cache",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not\\\"A\\\\Brand\";v=\"99\"",
                    "sec-ch-ua-mobile": "?1",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                  },
                  "referrer": "https://www.ugbazaar.com/products?page=2",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "include"
        }
        );
        totalProdcts = result.body.meta.pagination.total;
        totalPage = result.body.meta.pagination.lastPage;  
        for(let i = 0; i<=24; i++){
            console.log(pageNo)
            try {
            // console.log(result.body.data.products[i].price);
            // console.log(result.body.data.products[i].name);
            await ug.insertOne(
                {
                    _id: result.body.data.products[i].id,
                    name: result.body.data.products[i].name,
                    image: result.body.data.products[i].image,
                    price: result.body.data.products[i].price,
                    productUrl: "https://www.ugbazaar.com/product/"+result.body.products[i].slug,
                    site: "UGBazzar",
                    created_date: Date(),
                     updated_date: Date(),
                     site: "UG Bazar"
                }
            )
                
            } catch (error) {
                console.error(error);
            }
            
        }
    
    console.log("scraping next page")

    await sleep(5000);
    console.log(pageNo);

    }
    // console.log(result)
}

async function sleep(miliseconds) {
    return new Promise(resolve=> setTimeout(resolve, miliseconds))
}

module.exports.ugUpdate = async()=>{
    const MongoClient = await mongodb();
    const pagesize = 24;
    let totalProdcts = 1000;
    let totalPage = 1000;
    const ugbazar = MongoClient.db('Ecommerce-Price-Tracker');
    const ug = ugbazar.collection('ug');
    let i =0;
    for(let pageNo =1; pageNo<totalPage; pageNo= pageNo+1){
        const result = await needle(
            "get",
            `https://www.ugbazaar.com/api/V2/products?page=${pageNo}`,{
    
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
                    "access-control-allow-origin": "*",
                    "cache-control": "no-cache",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not\\\"A\\\\Brand\";v=\"99\"",
                    "sec-ch-ua-mobile": "?1",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                  },
                  "referrer": "https://www.ugbazaar.com/products?page=2",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "include"
        }
        );
        totalProdcts = result.body.meta.pagination.total;
        totalPage = result.body.meta.pagination.lastPage;  
        for(let i = 0; i<=24; i++){
            console.log(pageNo)
            try {
            // console.log(result.body.data.products[i].price);
            // console.log(result.body.data.products[i].name);
            await ug.updateMany(
                {
                    _id: result.body.data.products[i].id
                },{$set: {
                    name: result.body.data.products[i].name,
                    image: result.body.data.products[i].image,
                    price: result.body.data.products[i].price,
                    productUrl: "https://www.ugbazaar.com/product/"+result.body.data.products[i].slug,
                    updated_date: Date(),
                    site: "UG Bazar"
                }}
            )
                
            } catch (error) {
                console.error(error);
            }
            
        }
    
    console.log("scraping next page")

    await sleep(5000);
    console.log(pageNo);

    }
    // console.log(result)
}