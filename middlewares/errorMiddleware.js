class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 1100) {
    const message = `Duplicate field value entered`;
    err = new errorHandler(message, 400);
  }

  if (err.name === "JsonwebtokenError") {
    const message = `JSON web token is invalid, try again`;
    err = new errorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `JSON web token is Expired, try again`;
    err = new errorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join("")
    : err.message;

    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
    });
};
export default errorHandler;
