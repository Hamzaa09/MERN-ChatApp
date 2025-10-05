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
    origin: process.env.VITE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(errorMiddleware);

// db
connectDB();

// Router
app.use(userRouter);
app.use(messageRouter);

// server.listen(process.env.PORT, () => {
//   console.log(`listening on http://localhost:${process.env.PORT}`);
// });

export default app;
