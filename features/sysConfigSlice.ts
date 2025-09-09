// features/sysConfigSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SysConfigState = {
  theme: "light" | "dark";
  language: string;
  dinamicParams: Record<string, string>;
};

const initialState: SysConfigState = {
  theme: "light",
  language: "en",
  dinamicParams: {},
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
    setDinamicParams(state, action: PayloadAction<Record<string, string>>) {
      console.log("setDinamicParams action.payload", action.payload);
      state.dinamicParams = action.payload;
    },
  },
});

export const { setTheme, setLanguage, setDinamicParams } =
  sysConfigSlice.actions;
export const sysConfigReducer = sysConfigSlice.reducer;
