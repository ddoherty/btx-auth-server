module.exports = errorHandler;

// https://expressjs.com/en/guide/error-handling.html

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // other errors
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
