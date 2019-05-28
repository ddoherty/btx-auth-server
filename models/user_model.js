const mongoose = require("mongoose");

// https://mongoosejs.com/docs/guide.html
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true }, // same as email
  email: {type: String, required: true },
  pw_hash: { type: String, required: true }, // hashed password
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  acceptedLicense: { type: Date, default: Date.now },
  role: {type: String, required: true }
});

// If you use toJSON() or toObject() mongoose will not include virtuals by default.
schema.set("toJSON", { virtuals: true }); 

module.exports = mongoose.model("User", schema);
