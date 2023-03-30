import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sidebarDataType {
  username: string | null;
  email: string | null;
}

const initialState: sidebarDataType = {
  username: null,
  email: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.username = null;
      state.email = null;
    },
  },
});

export const { setUser } = userDataSlice.actions;

export default userDataSlice.reducer;
