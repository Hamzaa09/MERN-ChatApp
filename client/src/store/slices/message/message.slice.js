import { createSlice } from "@reduxjs/toolkit";
import { getMsgThunk, sendMsgThunk } from "./message.thunk";

const initialState = {
  messages: null,
  msgLoading: false,
};

export const messageSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
  },

  extraReducers: (builder) => {
    // get msg
    builder.addCase(getMsgThunk.pending, (state, action) => {
      state.msgLoading = true;
    });

    builder.addCase(getMsgThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.msgLoading = false;
      state.messages = action.payload?.response?.conversation?.messages;
    });

    builder.addCase(getMsgThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.msgLoading = false;
    });

    // send msgs
    builder.addCase(sendMsgThunk.pending, (state, action) => {
      state.msgLoading = true;
    });

    builder.addCase(sendMsgThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.msgLoading = false;
      state.messages = [
        ...state.messages,
        action.payload?.response?.newMessage,
      ];
    });

    builder.addCase(sendMsgThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.msgLoading = false;
    });
  },
});

export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
