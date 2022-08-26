const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  //2 error scenarios: 1: no auth headers so the split method fails (trycatch block), 2: we have headers but it does not give us a token (if block)
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Authentication failed, no auth headers");
      error.code = 401;
      return next(error);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
    
  } catch (err) {
    const error = new Error("Authentication failed");
    error.code = 401;
    return next(error);
  }
};
