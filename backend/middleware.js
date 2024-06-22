import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded.userId) {
    req.userId = decoded.userId;
  } else {
    res.status(403).json({});
  }
  next();
}

export { authMiddleware };
