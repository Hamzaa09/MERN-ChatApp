import { Socket } from "dgram";
import express from "express";
import http, { createServer } from "http";
import { Server } from "socket.io";
import { resourceLimits } from "worker_threads";
import dotenv from "dotenv";

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
