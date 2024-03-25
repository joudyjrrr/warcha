import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  money: [],
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
   changeMony: (state, action) => {
    const exists = state.money.some(item => item.currency === action.payload.currency);
  if (!exists) {
    state.money.push(action.payload);
  }
    },
  },
});

export const { changeMony } = moneySlice.actions;
export default moneySlice.reducer;
