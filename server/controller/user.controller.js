import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { sendToken } from "../utilities/token.utility.js";

// singup
export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, confirmPassword } = req.body;
  // console.log(fullName.split(" ")[0],"+", fullName.split(" ")[1])

  const avatar = `https://ui-avatars.com/api/?name=${
    fullName.split(" ")[0] + "+" + fullName.split(" ")[1]
  }&background=random`;

  if (!fullName || !username || !password || !confirmPassword) {
    return next(new errorHandler("All fields required!", 400));
  }

  const user = await userModel.findOne({ username });
  if (user) {
    return next(new errorHandler("User exists!", 400));
  }

  if (password !== confirmPassword) {
    return next(new errorHandler("Confirm Password didn't matched!", 400));
  }

  // password encryption
  const encryptedPass = await bcrypt.hash(password, 10);

  // db work
  const newUser = await userModel.create({
    fullName,
    username,
    password: encryptedPass,
    confirmPassword,
    avatar,
  });

  sendToken(res, newUser, 200);
});

// login
export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new errorHandler("Please enter a valid Username or Password!", 400)
    );
  }

  const user = await userModel.findOne({ username });
  if (!user) {
    return next(
      new errorHandler("Please enter a valid Username or Password!", 400)
    );
  }

  // password decryption
  const decryptedPass = await bcrypt.compare(password, user.password);
  if (!decryptedPass) {
    return next(
      new errorHandler("Please enter a valid Username or Password!", 400)
    );
  }

  sendToken(res, user, 200);
});

// update
export const userUpdate = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const User = await userModel.findById(id);

  if (!User) {
    return;
  }

  const editedUser = await userModel.findByIdAndUpdate(id, req.body, {new: true})

  res.status(200).json({
    success: true,
    response: editedUser,
  });
});

// get profile
export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const fetchedUser = await userModel.findById(userId);

  res.status(200).json({
    success: true,
    response: fetchedUser,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfull!",
    });
});

export const otherUsers = asyncHandler(async (req, res, next) => {
  const otherUser = await userModel.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    response: otherUser,
  });
});
