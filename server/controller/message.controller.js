import messageModel from "../models/message.model.js";
import conversationModel from "../models/conversation.model.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { getSocketId, io } from "../socket/socket.js";
import { uploadToCloudinary } from "../utilities/cloudinary.utility.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields required!", 400));
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

  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage);

  res.status(200).json({
    success: true,
    response: {
      newMessage,
    },
  });
});

export const sendImages = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;

  if (!senderId || !receiverId || !req.files) {
    return next(new errorHandler("All fields required!", 400));
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
  if (req.files && req.files.length > 0) {
    const updatedResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    imagesUrl = updatedResults
      .filter((r) => r && r.secure_url)
      .map((r) => r.secure_url);
  }

  const newMessage = await messageModel.create({
    senderId,
    receiverId,
    images: imagesUrl,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage);

  res.status(200).json({
    success: true,
    response: {
      newMessage,
    },
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;

  if (!senderId || !receiverId) {
    return next(new errorHandler("All fields required!", 400));
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
