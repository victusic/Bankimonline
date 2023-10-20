import React, { useMemo, useState } from 'react'
import { MainInput } from '../../ui/inputs/mainInput/mainInput'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle'
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/mortgageCalculationSlice';
import InfoPlate from '../../ui/panels/infoPlate/InfoPlate';
import WarningPanel from '../../ui/panels/warningPanel/WarningPanel';
import { useFormikContext } from 'formik';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';
import numeral from 'numeral';

const getPayment = (priceEstate, downPayment, term, interestRate) => {
  //годовая ставка/12
  const monthlyRate = interestRate/12/100;

  //кол-во платежей
  const numberPayments = term*12;  

  //аннуитентный платёж
  const annuitantPayment = (monthlyRate*((1+monthlyRate)**numberPayments))/(((1+monthlyRate)**numberPayments)-1)

 return Math.ceil((priceEstate-downPayment)*annuitantPayment);
}

const MonthlyPayment = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  // Извлекаем данные формы из Redux состояния
  const formData = useSelector(state => state.calcMortgage.formData);

  // Извлекаем данные для расчета из данных формы
  const { priceEstate, downPayment, term, interestRate, monthlyPayment } = formData;

  const setPrice = (newPrice) => {
    // Обновляем значение ежемесячного платежа в данных формы
    const updatedFormData = { ...formData, monthlyPayment: newPrice };
    dispatch(setFormData(updatedFormData));
  };

  // Вычисляем минимально и максимально возможные платежи с помощью useMemo
  const [minPayment, setMinPayment] = useState(0);
  const [maxPayment, setMaxPayment] = useState(0);

  useMemo(() => {
    const updatePrice = getPayment(priceEstate, downPayment, term, interestRate);
    const updateMinPrice = getPayment(priceEstate, downPayment, 30, interestRate);
    const updateMaxPrice = getPayment(priceEstate, downPayment, 4, interestRate);

    dispatch(setFormData({ ...formData, monthlyPayment: updatePrice }));
    setMinPayment(updateMinPrice);
    setMaxPayment(updateMaxPrice);
  }, [priceEstate, downPayment, term, interestRate]);

  return (
    <InputsPlateLayout>
      <ComponentTitle>Ежемесячный платеж</ComponentTitle>
      <MainInput
        viewRange={true}
        viewSheikel={true}
        step={5}
        minValue={minPayment}
        maxValue={maxPayment}
        value={monthlyPayment}
        setValue={setPrice}
        error={errors.monthlyPayment}
        touched={touched.monthlyPayment}
      />
      <InfoPlate fValue={numeral(minPayment).format("0,0") + ' ₪'} sValue={numeral(maxPayment).format("0,0") + ' ₪'} />
      <WarningPanel>Увеличьте ежемесячный платеж и переплачивайте меньше</WarningPanel>

      {errors.monthlyPayment && touched.monthlyPayment ? (
          <ErrorPanel>{errors.monthlyPayment}</ErrorPanel>
       ) : null}
    </InputsPlateLayout>
  );
};

export default MonthlyPayment
