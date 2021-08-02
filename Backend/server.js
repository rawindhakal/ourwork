const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ug = require('./Crawlers/ugBazarCrawler')
const gyapu = require('./Crawlers/GyapuCrawler')
const daraz = require('./Crawlers/DarazCrawler')
const cron = require('node-cron');
const connectDB = require("./config/db");
const cors = require("cors");
const compression = require("compression");

var productInserted = false;
// crawler scheduler
cron.schedule('48 15 * * 0-6', function() {
  if(productInserted){
    console.log("Crawler Running");
    ug.ugUpdate();
    gyapu.gyapuUpdate();
    daraz.darazUpdate("smartphones");
    daraz.darazUpdate("tablets");
    daraz.darazUpdate("mobiles-tablets-accessories");
    daraz.darazUpdate("multi-function-printers");
    daraz.darazUpdate("womens-clothing");
  }
  // console.log(date.now)
});

function runCrawling(){
  if(productInserted == false){
    ug.ugCrawler();
    gyapu.gyapuCrawler();
    daraz.darazCrawler("smartphones");
    daraz.darazCrawler("tablets");
    daraz.darazCrawler("mobiles-tablets-accessories");
    daraz.darazCrawler("multi-function-printers");
    daraz.darazCrawler("womens-clothing");
    productInserted = true
  }
  
}


// Bodyparser middleware
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
runCrawling();
const auth = require("./middleware/auth");
// Passport config
const userRoute = require("./routes/user.route");
app.use("/api/user", userRoute);
const productRoute = require("./routes/products.route");
app.use("/api/product", productRoute);
const trackRoute = require("./routes/track.route");
app.use("/api/dashboard", auth, trackRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));