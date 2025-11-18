import AppError from "../libs/appError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    status: false,
    message: "Lỗi máy chủ nội bộ",
  });
};

export default errorHandler;
