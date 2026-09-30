import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axoisInstance } from "../../frontendUtillities/axios.instance";

base = '/api/v1/user'

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.post(`${base}/login`, {
        username,
        password,
      });
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "user/signup",
  async (
    { fullName, username, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const request = await axoisInstance.post(`${base}/signup`, {
        fullName,
        username,
        password,
        confirmPassword,
      });
      // toast.success("Registered Successfully!");
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  `user/profileupdate`,
  async ({ id, fullName, username }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.patch(`${base}/profileupdate`, {
        id,
        fullName,
        username,
      });

      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.post(`${base}/logout`);
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.get(`${base}/getProfile`);
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOthers",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.get(`${base}/getOthers`);
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);
