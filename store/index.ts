import { configureStore } from "@reduxjs/toolkit";

import messageDataReducer from "./message";
import sidebarDataReducer from "./sidebar";

const store = configureStore({
  reducer: {
    messageData: messageDataReducer,
    sidebarData: sidebarDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
