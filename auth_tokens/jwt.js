/*
express-jwt: Middleware that validates JsonWebTokens and sets req.user.

Lets you authenticate HTTP requests using JWT tokens in Node.js applications. 
JWTs are typically used to protect API endpoints.
*/
const expressJwt = require("express-jwt");
const config = require("../config.json");
const userService = require("../services/user_service");

module.exports = jwt;

// https://jwt.io/introduction/

function jwt() {
  const secret = config.secret;
  return expressJwt({
    secret,
    isRevoked: isRevokedCallback,
  }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
    ],
  });
}

/*
https://cnpmjs.org/package/express-jwt
It is possible that some tokens will need to be revoked so they cannot 
be used any longer. You can provide a function as the isRevoked: option. 
The signature of the function is function(req, payload, done).

    req (Object) - The express request object.
    payload (Object) - An object with the JWT claims.
    done (Function) - A function with signature function(err, revoked) 
      to be invoked once the check to see if the token is revoked or not is complete.
        err (Any) - The error that occurred.
        revoked (Boolean) - true if the JWT is revoked, false otherwise.

*/
async function isRevokedCallback(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
