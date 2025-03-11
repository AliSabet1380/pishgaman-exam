import { createSlice } from "@reduxjs/toolkit";

interface VehicleState {
  allVehicle: { id: number; name: string }[];
  selectedVehicle: { id: number; name: string } | null;
}

const initialState: VehicleState = {
  allVehicle: [],
  selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.allVehicle = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      const vehicle = state.allVehicle.findIndex(
        (vehicle) => vehicle.id === action.payload
      );
      state.selectedVehicle = state.allVehicle[vehicle];
    },

    clearVehicles: (state) => {
      state.allVehicle = [];
      state.selectedVehicle = null;
    },
  },
});

export const { setVehicles, setSelectedVehicle, clearVehicles } =
  vehicleSlice.actions;
export const vehicleReducer = vehicleSlice.reducer;
