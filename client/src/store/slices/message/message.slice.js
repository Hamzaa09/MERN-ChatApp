import { createSlice } from "@reduxjs/toolkit";
import { getMsgThunk, sendMsgThunk } from "./message.thunk";

const initialState = {
  messages: null,
  pendingMsgs: [],
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

    setNewStatus: (state, action) => {
      const { msgID, status } = action.payload;
      if (!state.messages) return;

      state.messages = state.messages.map((msg) =>
        msg._id == msgID ? { ...msg, status } : msg
      );
    },

    setStatusToSeen: (state, action) => {
      const { newMessages } = action.payload;
      if (!state.messages) return;

      state.messages = state.messages.map((msg) => {
        // return newMessages.includes(msg._id) ? { ...msg, status: "seen" } : msg;
        if (newMessages.includes(msg._id)) {
          return { ...msg, status: "seen" };
        } else {
          return msg;
        }
      });
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
    builder.addCase(sendMsgThunk.pending, (state, action) => {});

    builder.addCase(sendMsgThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      // const msg = action.payload?.response?.newMessage;

      // state.messages = [...state.messages, msg];
    });

    builder.addCase(sendMsgThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

export const { setNewMessage, setNewStatus, CountUnSeenMsgs, setStatusToSeen } =
  messageSlice.actions;

export default messageSlice.reducer;
