import jwt from "jsonwebtoken";
import { catchAsynError } from "./catchAsError.js";
import ErrorHandler from "./errorMiddleware.js";
import database from "../database/db.js";

export const isAuthenticated = catchAsynError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await database.query(`SELECT * FROM USERS WHERE ID = $1`, [
    decoded.id,
  ]);

  req.user = user.rows[0];
  next();
});

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403,
        ),
      );
    }
    next();
  };
};
