const nodemailer = require('nodemailer');
const User = require('../models/User');

async function sendEmail(name, image, actualPrice, productUrl, creator)  {
  const userData = await User.findById(creator).populate("createdTracks");
  let dataObj = {
    img: image,
    price: actualPrice,
    url: productUrl,
    name: name,
    data: userData
  }
    mailConfig(dataObj)
}

function mailConfig(dataObj) {
    console.log(dataObj);
    const mailOptions = {
      from: '"TrackerBase" <rabin@ganapatibakers.com.np>',
      to: `${dataObj.data.email}`,
      subject: `TrackBase - ${dataObj.name} HAS HIT THE TARGET PRICE`,
      html: `<p>The ${dataObj.name} you wanted to buy is now at your target price! <a href="${dataObj.url}">Buy it HERE!</a></p>`
    };
    const transporter = nodemailer.createTransport({
      host: 'mail.ganapatibakers.com.np',
      port: 465,
      auth: {
          user: 'rabin@ganapatibakers.com.np',
          pass: 'rabin@9841354276'
      }
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log('Email Sent Successfully');
    });
  }

  exports.sendEmail = sendEmail;