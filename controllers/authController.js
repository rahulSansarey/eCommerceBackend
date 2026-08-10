import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsynError } from "../middlewares/catchAsError.js";
import database from "../database/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtToken.js";

// Register module starts here
export const register = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if ((!email, !name, !password)) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const isAlreadyRegistered = await database.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );
  if (isAlreadyRegistered.rows.length > 0) {
    return next(
      new ErrorHandler("User already registered with this email", 400),
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await database.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword],
  );
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: user.rows[0],
  });

  generateToken(user.rows[0], 201, "User registered successfully", res);
});

// Register module ends here

// Login module starts here

export const login = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const user = await database.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (user.rows.length === 0) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.rows[0].password,
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }

  generateToken(user.rows[0], 200, "logged in successfully", res);
});

// login module ends here

// 
export const getUser = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;
});

export const logout = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;
});
