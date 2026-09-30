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

// configs
dotenv.config();

// PORT
const PORT = process.env.PORT || 5000;

// db
connectDB();

// middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    maxAge: 600,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

// export default app // if deployed on vercel;
