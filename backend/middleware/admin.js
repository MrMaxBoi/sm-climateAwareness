const safeEqual = (left, right) => {
  if (typeof left !== "string" || typeof right !== "string" || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
};

export const requireAdmin = (req, res, next) => {
  if (!safeEqual(req.get("X-Admin-Key"), process.env.ADMIN_KEY)) {
    return res.status(401).json({ success: false, message: "Admin access is not authorized" });
  }
  return next();
};
