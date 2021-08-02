const cron = require('node-cron');
const fs = require('fs');
// const SingleProduct = require('../Model/SingleProduct');
const Track = require('../Models/Track')
// import {sendEmail} from "./Mailer"
cron.schedule('0 */6 * * *', () => {
    SingleProduct.find({}, (err, items) => {
      let trackingItems = [];
      items.forEach(e => {
        if (e.tracking === true) {
          trackingItems.push(e);
        }
      });
      if (err) {
        console.log({
          error: err,
          msg: 'Failed to update item'
        });
      }
      trackingItems.forEach(e => {
        console.log('Updating');
        cron_update_item(e._id, e.targetPrice);
      });
    });
  });

exports.cron_update_item = async (id, targetPrice) => {
    let itemId = id;
    await Track.findById(itemId, (err, item) => {
      scraper(item.link)
        .then(data => {
          if (data) {
            let newObj = {
              tite: data.title,
              price: data.priceInt,
              date: Date.now().toString()
            };
            SingleProduct.findOneAndUpdate(
              { _id: itemId },
              { $push: { pastPrices: newObj } },
              (err, result) => {
                if (err) {
                  return {
                    success: false,
                    error: err
                  };
                }
                if (newObj.price < targetPrice) {
                  sendEmail(itemId);
                }
                let log = {
                  msg: `Cron Job Run`,
                  time: new Date()
                };
                console.log('Scraping item');
                fs.writeFileSync('./logs/cron.json', JSON.stringify(log), {
                  encoding: 'utf8',
                  flag: 'a'
                });
                return;
              }
            );
          }
        })
        .catch(err => {
          return {
            success: false,
            message: 'Major error',
            error: err
          };
        });
    });
  };
