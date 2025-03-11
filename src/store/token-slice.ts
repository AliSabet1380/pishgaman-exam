import { createSlice } from "@reduxjs/toolkit";

interface TokenSliceState {
  token: string | null;
}

const initialState: TokenSliceState = {
  token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: { type: string; payload: { token: string } }) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
