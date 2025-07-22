const jwt = require("jsonwebtoken");
const requireAdmin = requireRole(["admin"]);

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
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
    console.log("Checking if role is in:", allowedRoles);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient role" });
    }
    next();
  };
}

module.exports = { verifyToken, requirePlan, requireRole, requireAdmin };
