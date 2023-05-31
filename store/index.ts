import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import messageDataReducer from "./message";
import sidebarDataReducer from "./sidebar";
import userDataReducer from "./user";
import socketReducer from "./socket";

const store = configureStore({
  reducer: {
    messageData: messageDataReducer,
    sidebarData: sidebarDataReducer,
    userData: userDataReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
