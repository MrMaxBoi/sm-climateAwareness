export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
};

export const errorHandler = (error, _req, res, _next) => {
  if (error?.code === 11000) {
    return res.status(409).json({ success: false, message: "This activity has already been submitted" });
  }

  if (error?.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid resource identifier" });
  }

  console.error(error);
  return res.status(error.status || 500).json({
    success: false,
    message: error.status ? error.message : "Unexpected server error",
  });
};
