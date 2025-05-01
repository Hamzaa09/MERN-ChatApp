import { createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import { axoisInstance } from "../../../frontendUtillities/axios.instance";

export const sendMsgThunk = createAsyncThunk(
  "/sendMsg",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.post(`/sendMsg/${receiverId}`, {
        message,
      });
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMsgThunk = createAsyncThunk(
  "/getMsg",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.get(`/getMsg/${receiverId}`);
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
