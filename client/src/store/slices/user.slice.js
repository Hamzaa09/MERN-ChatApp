import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
  getUserThunk,
  getOtherUsersThunk,
} from "./user.thunk";

const initialState = {
  authCheck: false,
  userProfile: null,
  otherUsers: null,
  selectedUserState: null,
  // selectedUserState: JSON.parse(localStorage.getItem("selectedUser")),
  screenLoading: false,
  buttonLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      // localStorage.setItem("selectedUser",JSON.stringify(action.payload))
      state.selectedUserState = action.payload;
    },
  },

  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.authCheck = true;
      state.userProfile = action.payload?.response?.user;
    });
    
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.authCheck = false;
    });

    // signup
    builder.addCase(signupUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.authCheck = false;
    });

    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.response?.user;
      state.buttonLoading = false;
      state.authCheck = true;
    });

    builder.addCase(signupUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.authCheck = false;
    });

    // logout
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.authCheck = false;
      state.userProfile = null;
      state.otherUsers = null;
      state.selectedUserState = null;
      localStorage.clear()
    });

    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // getUser
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.screenLoading = true;
    });

    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.authCheck = true;
      state.userProfile = action.payload?.response;
    });

    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.authCheck = false;
    });

    // getOtherUser
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });

    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.response;
    });

    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const { selectedUser } = userSlice.actions;

export default userSlice.reducer;
