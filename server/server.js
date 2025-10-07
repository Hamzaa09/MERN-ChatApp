import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { connectDB } from "./db/connection.js";
import cors from "cors";

// middleware imports
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

// PORT
const PORT = process.env.PORT || 5000;

// configs
dotenv.config();

// db
connectDB();

// middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(errorMiddleware);

// Router
app.use(userRouter);
app.use(messageRouter);

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

// export default app;
