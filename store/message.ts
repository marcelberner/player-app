import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface messageType {
  userId: string;
  message: string;
  date: string;
  time: string;
}

interface userType {
  id: string;
  name: string;
  isOnline: boolean;
}

interface messagesDataType {
  toUser: userType | null;
  messages: messageType[] | [];
}

const initialState: messagesDataType = {
  toUser: null,
  messages: [],
};

const messageDataSlice = createSlice({
  name: "messageData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      state.toUser = action.payload;
    },
    addMessage: (state, action: PayloadAction<messageType>) => {
      const messages = [...state.messages, action.payload];
      state.messages = messages;
    },
    clear: (state) => {
      state.toUser = null;
      state.messages = [];
    },
  },
});

export const { setUser, addMessage, clear } = messageDataSlice.actions;

export default messageDataSlice.reducer;
