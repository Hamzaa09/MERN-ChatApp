import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axoisInstance } from "../../frontendUtillities/axios.instance";

export const loginUserThunk = createAsyncThunk(
  "/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.post("/login", {
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
  "/signup",
  async (
    { fullName, username, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const request = await axoisInstance.post("/signup", {
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
  `/profileupdate`,
  async ({ id, fullName, username }, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.patch(`/profileupdate`, {
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
  "/logout",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.post("/logout");
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.get("/getProfile");
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "/getOthers",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axoisInstance.get("/getOthers");
      return request.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);
