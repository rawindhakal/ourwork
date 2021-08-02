const Crawler = require('cheerio-crawler')
const mongodb = require('./mongodb.connect');

var crawl = Crawler(async function (url, $) {
    const MongoClient = await mongodb();
    const sastodealDB = MongoClient.db('Ecommerce-Price-Tracker');
    const sastodeal = sastodealDB.collection('SastoDeal');
    var title = $('.product-item-info>.product-item-link').text();
    var price = $('product-item-info>.price').text();
    var url = $('.product-item-link').attr('href');
    var image = $('.product-image-photo').attr('src');
    console.log(url);

});

// ...

crawl('https://www.sastodeal.com/electronic/televisions.html', function (err) {
    if (err) {
        console.error('unable to complete crawl:', err.message);
    }
    else {
        console.log('finished');
    }
});