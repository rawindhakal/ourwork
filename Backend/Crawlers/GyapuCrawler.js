const needle = require('needle');
const connectDB = require('./mongodb.connect');


module.exports.gyapuCrawler = async()=>{
    const MongoClient = await connectDB();
    const pagesize = 24;
    let totalProdcts = 1000;
    let totalPage = 1000;
    const gyapuDB = MongoClient.db('TrackBase');
    const gyapu = gyapuDB.collection('allproducts');
    let i =0;
    try {
        for(let pageNo =1; pageNo<totalPage; pageNo= pageNo+1){
            const result = await needle(
                "get",
                `https://www.gyapu.com/api/product/productbycategory/civil-mall?&size=12&page=${pageNo}`, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
          "authorization": "",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not\\\"A\\\\Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?1",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "__cfduid=d9cd2cde0c3c438af841ec03ff3bb632e1615635410; _ga=GA1.2.131531124.1615635413; omnisendAnonymousID=bETknTlU77tYKp-20210313113659; _fbp=fb.1.1615635420170.1081681756; _hjid=a283fe83-b754-48ac-b3a9-c48d9f62f014; soundestID=20210329172135-CD8GaN1BVOenQD0vYIIkIUB3Bne0hVNtKJKHrU3RasOs7LGR9; omnisendSessionID=O3KaIicJW9WjTJ-20210329172135; _gid=GA1.2.573235361.1617038496; _gat_gtag_UA_150549428_1=1; _hjIncludedInPageviewSample=1; _hjTLDTest=1; _hjAbsoluteSessionInProgress=0; soundest-views=1"
        },
        "referrer": "https://www.gyapu.com/category/womens-wear",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
      }
            );
            totalProdcts = result.body.totaldata;
            console.log(totalProdcts)
            totalPage = totalProdcts/result.body.size;  
            console.log(totalPage)
            console.log(totalPage)
            for(let i = 0; i<=11; i++){
                console.log(pageNo)
                try {
                 console.log(result.body.data[i].name);
                 console.log("https://www.gyapu.com/detail/"+result.body.data[i].url_key);
                 console.log("https://www.gyapu.com/"+result.body.data[i].image[0].document.path);
                 console.log(result.body.data[i].max_sales_price);
                 console.log(result.body.data[i]._id);
                 await gyapu.insertOne(
                     {
                         _id: result.body.data[i]._id,
                         name: result.body.data[i].name,
                         image: "https://www.gyapu.com/"+result.body.data[i].image[0].document.path,
                         productUrl: "https://www.gyapu.com/detail/"+result.body.data[i].url_key,
                         price: result.body.data[i].max_sales_price,
                         site: "Gyapu",
                         created_date: Date(),
                         updated_date: Date()
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
            
            // console.log(result.body.mods.listItems)
    } catch (e) {
        console.error(e)
    }
    console.log("Task Complete")
    
}

async function sleep(miliseconds) {
    return new Promise(resolve=> setTimeout(resolve, miliseconds))
}



module.exports.gyapuUpdate = async()=>{
    const MongoClient = await connectDB();
    const pagesize = 24;
    let totalProdcts = 1000;
    let totalPage = 1000;
    const gyapuDB = MongoClient.db('Ecommerce-Price-Tracker');
    const gyapu = gyapuDB.collection('products');
    let i =0;
    try {
        for(let pageNo =1; pageNo<totalPage; pageNo= pageNo+1){
            const result = await needle(
                "get",
                `https://www.gyapu.com/api/product/productbycategory/civil-mall?&size=12&page=${pageNo}`, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
          "authorization": "",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not\\\"A\\\\Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?1",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "__cfduid=d9cd2cde0c3c438af841ec03ff3bb632e1615635410; _ga=GA1.2.131531124.1615635413; omnisendAnonymousID=bETknTlU77tYKp-20210313113659; _fbp=fb.1.1615635420170.1081681756; _hjid=a283fe83-b754-48ac-b3a9-c48d9f62f014; soundestID=20210329172135-CD8GaN1BVOenQD0vYIIkIUB3Bne0hVNtKJKHrU3RasOs7LGR9; omnisendSessionID=O3KaIicJW9WjTJ-20210329172135; _gid=GA1.2.573235361.1617038496; _gat_gtag_UA_150549428_1=1; _hjIncludedInPageviewSample=1; _hjTLDTest=1; _hjAbsoluteSessionInProgress=0; soundest-views=1"
        },
        "referrer": "https://www.gyapu.com/category/womens-wear",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
      }
            );
            totalProdcts = result.body.totaldata;
            console.log(totalProdcts)
            totalPage = totalProdcts/result.body.size;  
            console.log(totalPage)
            console.log(totalPage)
            for(let i = 0; i<=11; i++){
                console.log(pageNo)
                try {
                 console.log(result.body.data[i].name);
                 console.log("https://www.gyapu.com/detail/"+result.body.data[i].url_key);
                 console.log("https://www.gyapu.com/"+result.body.data[i].image[0].document.path);
                 console.log(result.body.data[i].max_sales_price);
                 console.log(result.body.data[i]._id);
                 await gyapu.updateOne(
                     {
                         _id: result.body.data[i]._id,
                         name: result.body.data[i].name,
                         image: "https://www.gyapu.com/"+result.body.data[i].image[0].document.path,
                         productUrl: "https://www.gyapu.com/detail/"+result.body.data[i].url_key,
                         price: result.body.data[i].max_sales_price,
                         site: "Gyapu",
                         created_date: Date(),
                         updated_date: Date()
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
            
            // console.log(result.body.mods.listItems)
    } catch (e) {
        console.error(e)
    }
    console.log("Task Complete")
    
}
