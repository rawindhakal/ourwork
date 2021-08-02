const mongodb = require('mongodb').MongoClient;

async function connect() {
      try {
          const client = await mongodb.connect(`mongodb://localhost:27017/TrackBase`,{
              useNewUrlParser: true
          });
          console.log("db connected");
          return client;
      } catch (e) {
        console.error(e)
      }
}

module.exports = connect;