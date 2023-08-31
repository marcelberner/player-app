import { configureStore } from "@reduxjs/toolkit"

import messageDataReducer from "./message"
import sidebarDataReducer from "./sidebar"
import userDataReducer from "./user"

const store = configureStore({
  reducer: {
    messageData: messageDataReducer,
    sidebarData: sidebarDataReducer,
    userData: userDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
