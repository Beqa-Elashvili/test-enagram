import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitalStateTtypes {
  isSidebarCollapsed: boolean;
}
const initialState: InitalStateTtypes = {
  isSidebarCollapsed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
  },
});
export const { setIsSidebarCollapsed } = globalSlice.actions;
export default globalSlice.reducer;
