import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  sendImages,
  sendMessage,
} from "../controller/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express();

router.post(
  "/sendImg/:receiverId",
  upload.array("images", 10),
  authCheck,
  sendImages
);
router.post("/sendMsg/:receiverId", authCheck, sendMessage);
router.get("/getMsg/:receiverId", authCheck, getMessages);

export default router;
