import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import messageReducer from "./slices/message/message.slice";
import socketReducer from "./slices/socket/socket.slice";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
