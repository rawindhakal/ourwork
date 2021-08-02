const needle = require('needle');
const mongodb = require('./mongodb.connect');


module.exports.darazCrawler = async(category)=>{
    const MongoClient = await mongodb();
    const pagesize = 24;
    let totalProdcts = 1000;
    let totalPage = 1000;
    const darazdb = MongoClient.db('TrackBase');
    const daraz = darazdb.collection('allproducts');
    let i =0;
    try {
        for(let pageNo =1; pageNo<totalPage; pageNo= pageNo+1){
            const result = await needle(
                "get",
                `https://www.daraz.com.np/${category}/?ajax=true&page=${pageNo}`,{
        
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                        "pragma": "no-cache",
                        "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not\\\"A\\\\Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?1",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "cookie": "lzd_cid=905a6e33-31ce-40b0-8ffa-0079aba45cbc; t_uid=905a6e33-31ce-40b0-8ffa-0079aba45cbc; t_fv=1612019131281; _gcl_au=1.1.1187178919.1612019132; cna=/6qQGEFSmhMCAS173WMgRSh9; _ga=GA1.3.2116661250.1612019134; _fbp=fb.2.1612019134383.996760462; _bl_uid=pakUbkebzatigqsyhrO5enOe5k3z; hng=NP|en-NP|NPR|524; userLanguageML=en-NP; lzd_sid=1296c229cd39af5e8f8a8c10c157170c; _tb_token_=779e56ee8590a; _gid=GA1.3.977837789.1616474860; curTraffic=lazada; xlly_s=1; t_sid=STpg98eCy9uYOHrERI3j17WRbnw9PXmd; utm_channel=NA; _gat_UA-98188874-1=1; daraz-marketing-tracker=hide; _m_h5_tk=85b38272f92cd49cd87fd16e0ab2780f_1616567113224; _m_h5_tk_enc=7421bfb7d3a358c242a5750e21deb75d; JSESSIONID=F1997A0C8541733F451EC210D77779AD; cto_bundle=Ga9_Cl85UFRQbDhjR2ZYeE1nd2toWm8lMkJCOFh5b0c3V2E1QXY1eDZzMWFManFDd0JiUWRXVm5lRVRwdXJFOVR4RGFIUTllRko5M0I4alplMVVQJTJCVGE5alRUQlREY3phdm95NTFLRmpmODF3Y0Y3S2ZjQ1VqbnNBMDMwY294byUyQk1nYiUyQkVoOXFJNElweTk4VVdjRElYdmd1dDc0dyUzRCUzRA; tfstk=cYEPBHcWVgIzV8nCW0ieO9BRfMmRZomjxhcorr07qHXPFv3lirdKnfESIf8dv4f..; l=eBTstPeqjTcdmSqfBOfZPurza779sIRqjuPzaNbMiOCPO_5H5KWPW6wwmY8MCnHNnsxJR3ysynp7B5YzjPUsh2XDzYYZz2cI3dRC.; isg=BEZGLtZlWgs1wA6gFR7BaTU9lzzIp4pheIZxBzBvM2lEM-dNmDJuc6GFDnf_qIJ5"
                      },
                      "referrer": "https://www.daraz.com.np/smartphones/?page=2&spm=a2a0e.searchlist.cate_1.1.748f735f18TgC6",
                      "referrerPolicy": "strict-origin-when-cross-origin",
                      "body": null,
                      "method": "GET",
                      "mode": "cors"
            }
            );
            totalProdcts = result.body.mainInfo.totalResults;
            console.log(totalProdcts)
            totalPage = totalProdcts/result.body.mainInfo.pageSize;  
            console.log(totalPage)
            console.log(totalPage)
            for(let i = 0; i<=40; i++){
                console.log(pageNo)
                try {
                 console.log(result.body.mods.listItems[i].name);
                 console.log(result.body.mods.listItems[i].productUrl);
                 console.log(result.body.mods.listItems[i].image);
                 console.log(result.body.mods.listItems[i].price);
                 console.log(result.body.mods.listItems[i].sku);
                 await daraz.insertOne(
                     {
                         _id: result.body.mods.listItems[i].itemId,
                         name: result.body.mods.listItems[i].name,
                         image: result.body.mods.listItems[i].image,
                         productUrl: result.body.mods.listItems[i].productUrl,
                         price: result.body.mods.listItems[i].price,
                         site: "Daraz",
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
            
            console.log(result.body.mods.listItems)
    } catch (e) {
        console.error(e)
    }
    
}

async function sleep(miliseconds) {
    return new Promise(resolve=> setTimeout(resolve, miliseconds))
}


module.exports.darazUpdate = async(category)=>{
    const MongoClient = await mongodb();
    const pagesize = 24;
    let totalProdcts = 1000;
    let totalPage = 1000;
    const darazdb = MongoClient.db('Ecommerce-Price-Tracker');
    const daraz = darazdb.collection('products');
    let i =0;
    try {
        for(let pageNo =1; pageNo<totalPage; pageNo= pageNo+1){
            const result = await needle(
                "get",
                `https://www.daraz.com.np/${category}/?ajax=true&page=${pageNo}`,{
        
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                        "pragma": "no-cache",
                        "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not\\\"A\\\\Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?1",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "cookie": "lzd_cid=905a6e33-31ce-40b0-8ffa-0079aba45cbc; t_uid=905a6e33-31ce-40b0-8ffa-0079aba45cbc; t_fv=1612019131281; _gcl_au=1.1.1187178919.1612019132; cna=/6qQGEFSmhMCAS173WMgRSh9; _ga=GA1.3.2116661250.1612019134; _fbp=fb.2.1612019134383.996760462; _bl_uid=pakUbkebzatigqsyhrO5enOe5k3z; hng=NP|en-NP|NPR|524; userLanguageML=en-NP; lzd_sid=1296c229cd39af5e8f8a8c10c157170c; _tb_token_=779e56ee8590a; _gid=GA1.3.977837789.1616474860; curTraffic=lazada; xlly_s=1; t_sid=STpg98eCy9uYOHrERI3j17WRbnw9PXmd; utm_channel=NA; _gat_UA-98188874-1=1; daraz-marketing-tracker=hide; _m_h5_tk=85b38272f92cd49cd87fd16e0ab2780f_1616567113224; _m_h5_tk_enc=7421bfb7d3a358c242a5750e21deb75d; JSESSIONID=F1997A0C8541733F451EC210D77779AD; cto_bundle=Ga9_Cl85UFRQbDhjR2ZYeE1nd2toWm8lMkJCOFh5b0c3V2E1QXY1eDZzMWFManFDd0JiUWRXVm5lRVRwdXJFOVR4RGFIUTllRko5M0I4alplMVVQJTJCVGE5alRUQlREY3phdm95NTFLRmpmODF3Y0Y3S2ZjQ1VqbnNBMDMwY294byUyQk1nYiUyQkVoOXFJNElweTk4VVdjRElYdmd1dDc0dyUzRCUzRA; tfstk=cYEPBHcWVgIzV8nCW0ieO9BRfMmRZomjxhcorr07qHXPFv3lirdKnfESIf8dv4f..; l=eBTstPeqjTcdmSqfBOfZPurza779sIRqjuPzaNbMiOCPO_5H5KWPW6wwmY8MCnHNnsxJR3ysynp7B5YzjPUsh2XDzYYZz2cI3dRC.; isg=BEZGLtZlWgs1wA6gFR7BaTU9lzzIp4pheIZxBzBvM2lEM-dNmDJuc6GFDnf_qIJ5"
                      },
                      "referrer": "https://www.daraz.com.np/smartphones/?page=2&spm=a2a0e.searchlist.cate_1.1.748f735f18TgC6",
                      "referrerPolicy": "strict-origin-when-cross-origin",
                      "body": null,
                      "method": "GET",
                      "mode": "cors"
            }
            );
            totalProdcts = result.body.mainInfo.totalResults;
            console.log(totalProdcts)
            totalPage = totalProdcts/result.body.mainInfo.pageSize;  
            console.log(totalPage)
            console.log(totalPage)
            for(let i = 0; i<=40; i++){
                console.log(pageNo)
                try {
                 console.log(result.body.mods.listItems[i].name);
                 console.log(result.body.mods.listItems[i].productUrl);
                 console.log(result.body.mods.listItems[i].image);
                 console.log(result.body.mods.listItems[i].price);
                 console.log(result.body.mods.listItems[i].sku);
                 await daraz.updateOne(
                     {
                         _id: result.body.mods.listItems[i].itemId,
                         name: result.body.mods.listItems[i].name,
                         image: result.body.mods.listItems[i].image,
                         productUrl: result.body.mods.listItems[i].productUrl,
                         price: result.body.mods.listItems[i].price,
                         site: "Daraz",
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
            
            console.log(result.body.mods.listItems)
    } catch (e) {
        console.error(e)
    }
    
}

