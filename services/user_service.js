const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const database = require("../database/mongodb");
const User = database.User;

module.exports = {
  authenticate,
  listAll,
  create,
  getById,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  let token;
  if (user && bcrypt.compareSync(password, user.pw_hash)) {
    if (config.hasOwnProperty('defaultJWTExpiration')) {
      const expires = Date.now()/1000 + config.defaultJWTExpiration;
      token = jwt.sign({ sub: user.id, exp: expires }, config.secret);
    } else {
      token = jwt.sign({ sub: user.id }, config.secret);
    }
    const { pw_hash, ...userNoHash } = user.toObject();
    return {
      ...userNoHash,
      token,
    };
  }
}

async function listAll() {
  return await User.find().select("-pw_hash"); // return all fields but password hash
}

async function getById(id) {
  return await User.findById(id).select("-pw_hash");
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw "Username already in use: " + userParam.username;
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.pw_hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

