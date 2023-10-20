import { configureStore } from "@reduxjs/toolkit";
import mortgageCalculationSlice from "./mortgageCalculationSlice";

export default configureStore({
    reducer: {
        calcMortgage: mortgageCalculationSlice
    }
});