import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const authCheck = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if(!token) {
    return next(new errorHandler("Invalid Token", 400))
  }

  const tokenData = jwt.verify(token, process.env.JWT_SECRET) 
  req.user = tokenData

  next()
});
