import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Socket } from "socket.io-client";

const initialState: { socket: null | Socket | any } = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | any>) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
