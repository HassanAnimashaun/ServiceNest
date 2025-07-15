const jwt = require("jsonwebtoken");
const requireAdmin = requireRole(["admin"]);

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(403).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requirePlan(allowedPlans = []) {
  return function (req, res, next) {
    const userPlan = req.user?.plan;
    if (!userPlan || !allowedPlans.includes(userPlan)) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient plan level" });
    }
    next();
  };
}

function requireRole(allowedRoles = []) {
  return function (req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient role" });
    }
  };
}
module.exports = { verifyToken, requirePlan, requireRole, requireAdmin };
