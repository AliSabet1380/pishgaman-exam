import { createSlice } from "@reduxjs/toolkit";

interface CoordsState {
  position: {
    coords: { lat: number; lng: number };
    name: "مبدا" | "مقصد";
  }[];
  disabled: boolean;
}

const initialState: CoordsState = {
  position: [],
  disabled: true,
};

const coordsSlice = createSlice({
  name: "coords",
  initialState,
  reducers: {
    setCoords: (state, action) => {
      if (state.position.length >= 2) return;
      if (state.position.length === 0) {
        state.position.push({ coords: action.payload.coords, name: "مبدا" });
        return;
      }
      if (state.position.length === 1) {
        state.position.push({ coords: action.payload.coords, name: "مقصد" });
        state.disabled = false;
        return;
      }
    },
    resetCoords: (state) => {
      if (state.position.length === 0) return;
      if (state.position.length === 1) {
        state.position = [];
        return;
      }
      if (state.position.length === 2) {
        const endPoint = state.position.findIndex(
          (coord) => coord.name === "مقصد"
        );
        state.position.splice(endPoint, 1);
        state.disabled = true;
        return;
      }
    },
    clearCoords: (state) => {
      state.position = [];
    },
  },
});

export const { setCoords, resetCoords, clearCoords } = coordsSlice.actions;
export const coordsReducer = coordsSlice.reducer;
