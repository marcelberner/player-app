import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface messageType {
  message_from: string
  message_to: string
  message_content: string
  create_date: any
}

interface userType {
  name: string
  isOnline: boolean
  email: string
}

interface messagesDataType {
  user: userType | null
  messages: messageType[] | []
}

const initialState: messagesDataType = {
  user: null,
  messages: [],
}

const messageDataSlice = createSlice({
  name: "messageData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload
    },
    setMessages: (state, action: PayloadAction<[messageType]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<messageType>) => {
      const messages = [...state.messages!, action.payload]
      state.messages = messages
    },
    clear: state => {
      state.user = null
      state.messages = []
    },
  },
})

export const { setUser, addMessage, clear, setMessages } =
  messageDataSlice.actions

export default messageDataSlice.reducer
