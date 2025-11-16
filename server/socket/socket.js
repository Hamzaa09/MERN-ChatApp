import { Socket } from "dgram";
import express from "express";
import http, { createServer } from "http";
import { Server } from "socket.io";
import { resourceLimits } from "worker_threads";
import dotenv from "dotenv";
import messageModel from "../models/message.model.js";

const app = express();
dotenv.config();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(userSocketMap));

    socket.on("msgDelivered", async (msgID) => {
      try {
        //update the msg
        const msg = await messageModel.findByIdAndUpdate(
          msgID,
          {
            status: "delivered",
          },
          { new: true }
        );

        //send new event to the sender to get new status
        const senderSocketID = getSocketId(msg.senderId.toString());
        io.to(senderSocketID).emit("msgUpdate", {
          msgID,
          status: "delivered",
        });
        const receiverSocketId = getSocketId(msg.receiverId.toString());
        io.to(receiverSocketId).emit("msgUpdate", {
          msgID,
          status: "delivered",
        });
      } catch (err) {
        console.log("error from socket.js", err);
      }
    });

    socket.on("msgIsReceived", async ({ senderId, receiverId }) => {
      try {
        //update the msg
        const msgs = await messageModel.find(
          { senderId, receiverId, status: { $ne: "seen" } },
          "_id"
        );

        await messageModel.updateMany(
          { senderId, receiverId },
          {
            status: "seen",
          }
        );

        //send new event to the sender to get new status
        const senderSocketID = getSocketId(senderId);
        io.to(senderSocketID).emit("setSeen", {
          newMessages: msgs.map((msg) => msg._id),
        });
        const receiverSocketId = getSocketId(receiverId);
        io.to(receiverSocketId).emit("setSeen", {
          newMessages: msgs.map((msg) => msg._id),
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  } else return;
});

const getSocketId = (userId) => {
  return userSocketMap[userId];
};

export { app, server, io, getSocketId };
