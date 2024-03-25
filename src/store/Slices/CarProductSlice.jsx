import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  car: [],
};

export const CarProductSlice = createSlice({
  name: "CarProduct",
  initialState,
  reducers: {
   
    freeCar: (state) => {
      state.car = [];
    },
   changeCar: (state,action) => {
    const exists = state.car.some(item => item.product_id === action.payload.product_id);
  if (!exists) {
    state.car.push(action.payload);
  }
    },
  },
});

export const { changeCar,freeCar } = CarProductSlice.actions;
export default CarProductSlice.reducer;
