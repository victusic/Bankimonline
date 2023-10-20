import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    priceEstate: 1000000, // стоимость недвижимости
    purchaseCity: null, // город покупки недвижимости
    whenRegister: null, // когда планируется оформление ипотеки
    downPayment: 500000, // первоначальный взнос
    propertyType: null, // тип недвижимости
    realEstate: null, // нынешнее владение недвижимостью
    percentageThreshold: 75, // процентное ограничение первого взноса
    term: 30, // срок выплат
    monthlyPayment: 11515, // сумма ежемесячных выплат
    interestRate: 5, //годовая процентная ставка
    percentages: 50 //процентный взнос
  },
};

const mortgageCalculationSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    startSubmitting: (state) => {
      state.isSubmitting = true;
      state.submitError = null;
    },
    submitSuccess: (state) => {
      state.isSubmitting = false;
    },
    submitError: (state, action) => {
      state.isSubmitting = false;
      state.submitError = action.payload;
    },
  },
});

export const {
  setFormData,
  startSubmitting,
  submitSuccess,
  submitError,
} = mortgageCalculationSlice.actions;

export default mortgageCalculationSlice.reducer;