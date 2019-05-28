/*
A REST-based authentication API built with node.js, express.js, and MongoDB.
Uses JSON web tokens (JWTs) to protect most API routes.
*/

// local configuration
const config = require("./config.json");

// express.js: fast, unopinionated, minimalist web framework for node.
const express = require("express");
// express.js app
const app = express();

// parse incoming request bodies in middleware before
// handlers, made available under the req.body property.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express middleware used to enable cross-origin resource sharing
const cors = require("cors");
app.use(cors());

// use JSON web tokens (JWT) to protect API endpoints
const jwt = require("./auth_tokens/jwt");
app.use(jwt());

// api routes
app.use("/users", require("./controllers/users_controller"));

/*
custom error handler
https://expressjs.com/en/guide/error-handling.html
define error-handling middleware last, after other app.use() and routes calls
*/
const errorHandler = require("./error_handler/error_handler");
app.use(errorHandler);

// start the server
let port = 3010;
if (config.hasOwnProperty("serverPort")) {
  port = config.serverPort;
}

// Start the authentication server
app.listen(port, function() {
  console.log("Authentication server running on:");
  console.log("  http://localhost:" + port);
});
