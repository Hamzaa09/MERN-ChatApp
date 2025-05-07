import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { connectDB } from "./db/connection.js";
import cors from "cors";
import {} from "./socket/socket.js";

// middleware imports
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

// configs
dotenv.config();

// middlewares
app.use(cookieParser());
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: "http://mern-chat-app-6azy.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// db
connectDB();

// Router
app.use(userRouter);
app.use(messageRouter);

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
