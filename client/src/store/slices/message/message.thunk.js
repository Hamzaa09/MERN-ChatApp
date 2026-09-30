import { createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import { axoisInstance } from "../../../frontendUtillities/axios.instance";

base = '/api/v1/message'

export const sendImgThunk = createAsyncThunk(
  "message/sendImg",
  async ({ receiverId, images }, { rejectWithValue }) => {
    try {
      const form = new FormData();

      for (const image of images) {
        form.append("images", image);
      }

      const request = await axoisInstance.post(`${base}/sendImg/${receiverId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const sendMsgThunk = createAsyncThunk(
  "message/sendMsg",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.post(`${base}/sendMsg/${receiverId}`, {
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
  "message/getMsg",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.get(`${base}/getMsg/${receiverId}`);
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
