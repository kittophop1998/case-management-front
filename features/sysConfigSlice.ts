// features/sysConfigSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SysConfigState = {
  theme: "light" | "dark";
  language: string;
  dynamicParams: Record<string, string>;
};
// dynamic;
const initialState: SysConfigState = {
  theme: "light",
  language: "en",
  dynamicParams: {},
};

const sysConfigSlice = createSlice({
  name: "sysConfig",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setDynamicParams(state, action: PayloadAction<Record<string, string>>) {
      console.log("setDynamicParams action.payload", action.payload);
      state.dynamicParams = action.payload;
    },
  },
});

export const { setTheme, setLanguage, setDynamicParams } =
  sysConfigSlice.actions;
export const sysConfigReducer = sysConfigSlice.reducer;
