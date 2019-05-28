const config = require("../config.json");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
console.log("Using mongoDB connection:");
if (MONGODB_URI) {
  console.log(MONGODB_URI);
} else {
  console.log("  " + config.connectionString);
}

// https://docs.mongodb.com/manual/reference/connection-string/
mongoose.connect(MONGODB_URI || config.connectionString, {
// connection will use createIndex() instead of ensureIndex() 
// for automatic index builds via Model.init().    
  useCreateIndex: true,
// make all connections set the useNewUrlParser option by default
  useNewUrlParser: true,
});

// needed for mongoDB versions < 5
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user_model')
};
