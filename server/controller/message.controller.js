import messageModel from "../models/message.model.js";
import conversationModel from "../models/conversation.model.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { getSocketId, io } from "../socket/socket.js";
import { uploadToCloudinary } from "../utilities/cloudinary.utility.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!message) {
    return next(new errorHandler("Message can't be empty!", 422));
  }

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return next(new errorHandler("Invalid receiver ID format!", 400));
  }

  if (senderId.toString() === receiverId) {
    return next(new errorHandler("You can't chat with yourself!", 400));
  }

  const receiverExists = await userModel.exists({ _id: receiverId });
  if (!receiverExists) {
    return next(new errorHandler("Recipient not found!", 400));
  }

  let conversation = await conversationModel.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await messageModel.create({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  const receiverSocketId = getSocketId(receiverId);
  const senderSocketId = getSocketId(senderId);

  if (senderSocketId) {
    io.to(senderSocketId).emit("newMessage", newMessage);
  }
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({
    success: true,
    response: {
      newMessage,
    },
  });
});

export const sendImages = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;

  if (!req.files || req.files.length === 0) {
    return next(new errorHandler("No image found!", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return next(new errorHandler("Invalid receiver ID format!", 400));
  }

  if (senderId.toString() === receiverId) {
    return next(new errorHandler("You can't chat with yourself!", 400));
  }

  const receiverExists = await userModel.exists({ _id: receiverId });
  if (!receiverExists) {
    return next(new errorHandler("Recipient not found!", 400));
  }

  let conversation = await conversationModel.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [senderId, receiverId],
    });
  }

  let imagesUrl = [];
  const updatedResults = await Promise.all(
    req.files.map((file) => uploadToCloudinary(file.buffer)),
  );

  if (imagesUrl.length === 0) {
    return next(new errorHandler("Image upload failed!", 500));
  }

  imagesUrl = updatedResults
    .filter((r) => r && r.secure_url)
    .map((r) => r.secure_url);

  const newMessage = await messageModel.create({
    senderId,
    receiverId,
    images: imagesUrl,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  const receiverSocketId = getSocketId(receiverId);
  const senderSocketId = getSocketId(senderId);

  if (senderSocketId) {
    io.to(senderSocketId).emit("newMessage", newMessage);
  }
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({
    success: true,
    response: {
      newMessage,
    },
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return next(new errorHandler("Invalid receiver ID format!", 400));
  }

  if (senderId.toString() === receiverId) {
    return next(new errorHandler("You can't chat with yourself!", 400));
  }

  let conversation = await conversationModel
    .findOne({
      participants: { $all: [senderId, receiverId] },
    })
    .populate("messages");

  res.status(200).json({
    success: true,
    response: {
      conversation,
    },
  });
});
