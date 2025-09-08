import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitalStateTtypes {
  isSidebarCollapsed: boolean;
  textOne: string;
  textTwo: string;
}
const initialState: InitalStateTtypes = {
  isSidebarCollapsed: false,
  textOne: "",
  textTwo: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setTextOne: (state, action: PayloadAction<string>) => {
      state.textOne = action.payload;
    },
    setTextTwo: (state, action: PayloadAction<string>) => {
      state.textTwo = action.payload;
    },
    clearTexts: (state) => {
      state.textOne = "";
      state.textTwo = "";
    },
  },
});
export const { setIsSidebarCollapsed, setTextOne, setTextTwo, clearTexts } =
  globalSlice.actions;
export default globalSlice.reducer;
