import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface sidebarDataType {
  isHidden: boolean
}

const initialState: sidebarDataType = {
  isHidden: true,
}

const sidebarDataSlice = createSlice({
  name: "sidebarData",
  initialState,
  reducers: {
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.isHidden = action.payload
    },
  },
})

export const { setSidebarState } = sidebarDataSlice.actions

export default sidebarDataSlice.reducer
