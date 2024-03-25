import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./Slices/languageSlice";
import moneySlice  from "./Slices/money";
import CarProductSlice from "./Slices/CarProductSlice";
const store = configureStore({
 reducer: {  language: languageSlice,money:moneySlice,car:CarProductSlice },
})
export default store